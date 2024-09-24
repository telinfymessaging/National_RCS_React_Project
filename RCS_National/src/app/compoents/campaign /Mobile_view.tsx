import { Box, Typography } from '@mui/material';
import { GlobalStyles } from '@mui/system';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import CarouselView from './carousel';
import StandAlone from './standAlone';
import MessageView from './message';
import { selectPreview } from '@/app/slices/campaign/campaign';
import { selectTemplateImage } from '@/app/slices/campaign/campaign';

interface Suggestion {
  suggestionType: 'reply' | 'url' | 'phoneNumber';
  displayText?: string;
  url?: string;
  phoneNumber?: string;
}

interface StandAlone {
  mediaUrl: string;
  cardTitle: string;
  cardDescription: string;
  suggestions: Suggestion[];
}

interface CarouselData {
  carouselList: Array<{
    mediaUrl: string;
    cardTitle: string;
    cardDescription: string;
    suggestions: Suggestion[];
  }>;
  height: number;
}

export default function Mobile_view() {
  const preview = useSelector(selectPreview);
  const templateImage = useSelector(selectTemplateImage);
  const [data, setData] = useState<any>(); // Set data as any to handle different types of data
  const [height, setHeight] = useState<number | null | string>(null);
  const [type, setType] = useState<any>(null);

  useEffect(() => {
    if (preview) {
      setData(null);
      setHeight(null);
      console.log("preveiew",preview);


      //jio

      if (preview && preview.content) {
    
        if (preview.content.richCardDetails && preview.content.richCardDetails.standalone) {
          const standalone = preview.content.richCardDetails.standalone.content;
          setData({
            mediaUrl: templateImage, 
            cardTitle: standalone.cardTitle,
            cardDescription: standalone.cardDescription,
            suggestions: standalone.suggestions
          });
          setHeight(standalone.cardMedia.mediaHeight);
          setType("standalone")
          console.log(height)
        }

        else if (preview.content.richCardDetails && preview.content.richCardDetails.carousel) {
          const carousel = preview.content.richCardDetails.carousel;
          const tempContents = carousel.contents;
          const actualData = tempContents.map((element: any) => ({
            mediaUrl: element.cardMedia.contentInfo.fileUrl,
            cardTitle: element.cardTitle,
            cardDescription: element.cardDescription,
            suggestions: element.suggestions,
          }));
          setData(actualData);
          setType("carousel")
          setHeight('MEDIUM');
        }


        // Check for plain text content
        else if (preview.content.plainText) {
          setData({
            textMessageContent: preview.content.plainText,
            suggestions: preview.content.suggestions,
          });
          setType("plainText")
        }
          
      }
        //vi
      else {
        
        if (preview.templateModel?.type === 'rich_card') {
          const temp = preview.templateModel.standAlone;
          setHeight(preview.templateModel.height);
          const obj = {
            mediaUrl: temp.mediaUrl,
            cardTitle: temp.cardTitle,
            cardDescription: temp.cardDescription,
            suggestions: temp.suggestions,
          };
          
          setData(obj);
          setType("standalone")
        }

        // Check for carousel type
        else if (preview.templateModel?.type === 'carousel') {
          const temp = preview.templateModel.carouselList;
          setHeight(preview.templateModel.height);
          const actualData = temp.map((element: any) => ({
            mediaUrl: element.mediaUrl,
            cardTitle: element.cardTitle,
            cardDescription: element.cardDescription,
            suggestions: element.suggestions,
          }));
          setData(actualData);
          setType("carousel")
        }

        // Check for text_message type
        else if (preview.templateModel?.type === 'text_message') {
          setData({
            textMessageContent: preview.templateModel.textMessageContent,
            suggestions: preview.templateModel.suggestions,
          });
          setType("plainText")
        }
      }
    }
  }
, [preview]); // Ensure this updates whenever `preview` changes

  useEffect(() => {
    console.log('Data updated:', data); // Log when `data` changes
  }, [data]); // Log only when `data` changes

  return (
    <Box display={'flex'} width={'40%'} sx={{ backgroundColor: 'white', paddingTop: '20px', paddingBottom: '80px' }} justifyContent="center">
      <GlobalStyles
        styles={{
          body: {
            fontFamily: "'Poppins', sans-serif",
          },
          '.material-symbols-outlined': {
            cursor: 'pointer',
          },
          '.msglinks a, .msglinks1 a': {
            textDecoration: 'none',
            color: '#68A3D8',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          '.msglinks hr, .msglinks1 hr': {
            margin: '5px 0',
          },
        }}
      />

      <Box className="campaign-details" sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            display: 'flex',
            fontSize: '20px',
            fontWeight: 700,
            color: '#60576B',
            justifyContent: 'center',
            width: '100%',
            height: 'auto',
            alignItems: 'center',
          }}
        >
          Campaign Details
        </Typography>

        <Box className="estimate-cnt">
          <Box
            className="mobileBox"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              padding: { xs: '0', md: '0 150px' },
              height: 'auto',
              position: 'relative',
            }}
          >
            <Box
              className="mobile"
              sx={{
                border: '2px solid lightgray',
                backgroundColor: 'lightgray',
                width: { xs: '100%', sm: 301.44 },
                height: 619.44,
                borderRadius: '35px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              <Box
                className="innerbar"
                sx={{
                  border: '1px solid rgba(231, 231, 231, 0.74)',
                  width: { xs: '100%', sm: 284.31 },
                  height: 600.15,
                  backgroundColor: '#fff',
                  borderRadius: 6,
                }}
              >
                <Box
                  sx={{
                    height: '4%',
                    width: '50%',
                    margin: '0 auto',
                    top: 0,
                    backgroundColor: 'rgba(139, 139, 139, 0.74)',
                    borderBottomLeftRadius: '15px',
                    borderBottomRightRadius: '15px',
                    position: 'relative',
                  }}
                />


                {
                  preview && (
                    (type==='standalone' && <StandAlone data={data} height={height} /> )||
                    (type==='carousel' && <CarouselView listData={data} height={height} />)||
                    (type==='plainText' && <MessageView data={data?.textMessageContent} suggestions={data?.suggestions} />)
                  )
                }
                {/* {preview && (type==='standalone' ? (
                  <StandAlone data={data} height={height} />
                ) : preview?.templateModel?.type === 'carousel' ? (
                  <CarouselView listData={data} height={height} />
                ) : preview?.templateModel?.type === 'text_message' ? (
                  <MessageView data={data?.textMessageContent} suggestions={data?.suggestions} />
                ) : (
                  <>Loading...</>
                ))} */}

              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
