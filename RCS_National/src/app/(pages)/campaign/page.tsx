import { getUserRcsTemplates } from "../../server/data/campaign";
import CampaignPage from "./_sections/campaign";
export default async function Campaign() {
  const templates: any = await getUserRcsTemplates();
  const serializedTemplates = JSON.parse(JSON.stringify(templates));
  return <CampaignPage data={serializedTemplates} />;
}