import { NotionAPI } from 'notion-client';
import { NotionRenderer } from 'react-notion-x';
import { use } from 'react';

const getData = async () => {
  const notion = new NotionAPI();

  const recordMap = await notion.getPage('067dd719a912471ea9a3ac10710e7fdf');

  return recordMap;
};
export default async function TermsPage() {
  const recordMap = use(getData());

  return <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} />;
}
