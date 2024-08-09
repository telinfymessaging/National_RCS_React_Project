import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MailIcon from '@mui/icons-material/Mail';
import CampaignIcon from '@mui/icons-material/Campaign';
import TemplateIcon from '@mui/icons-material/LibraryBooks';
import ReportIcon from '@mui/icons-material/Assessment';
import CodeIcon from '@mui/icons-material/Code';

const Sidebar: React.FC = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Inbox', icon: <MailIcon /> },
    { text: 'Campaigns', icon: <CampaignIcon /> },
    { text: 'Templates', icon: <TemplateIcon /> },
    { text: 'Reports', icon: <ReportIcon /> },
    { text: 'Developer API', icon: <CodeIcon /> },
  ];

  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
