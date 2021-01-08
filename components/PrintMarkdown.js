import unified from 'unified';
import parse from 'remark-parse';
import remark2react from 'remark-react';

const PrintMarkdown = ({ markdown }) => {
  // Convert the Markdown into React
  const content = unified().use(parse).use(remark2react).processSync(markdown).result;

  return <div>{content}</div>;
};
export default PrintMarkdown;
