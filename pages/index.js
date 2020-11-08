import Head from "next/head";
import styles from "../styles/Home.module.css";
import Graph from "react-graph-network";
import { orderBy, filter } from "lodash";
const fontSize = 14;
const radius = 10;

const data = {
  nodes: [
    {
      id: "HkqEDLvxE",
      image:
        "https://scrapbook.hackclub.com/_next/image?url=https%3A%2F%2Fdl.airtable.com%2F.attachmentThumbnails%2F75da7a62e42499f5e205ce7a8deeed7a%2F02a464cc&w=96&q=75",
    },
    {
      id: "011jVS4rb",
      image:
        "https://scrapbook.hackclub.com/_next/image?url=https%3A%2F%2Fdl.airtable.com%2F.attachmentThumbnails%2F75da7a62e42499f5e205ce7a8deeed7a%2F02a464cc&w=96&q=75",
    },
    {
      id: "PXACjDxmR",
      image:
        "https://scrapbook.hackclub.com/_next/image?url=https%3A%2F%2Fdl.airtable.com%2F.attachmentThumbnails%2F75da7a62e42499f5e205ce7a8deeed7a%2F02a464cc&w=96&q=75",
    },
    {
      id: "kuVISwh7w",
      image:
        "https://scrapbook.hackclub.com/_next/image?url=https%3A%2F%2Fdl.airtable.com%2F.attachmentThumbnails%2F75da7a62e42499f5e205ce7a8deeed7a%2F02a464cc&w=96&q=75",
    },
    {
      id: "UIEjvLJMd",
      image:
        "https://scrapbook.hackclub.com/_next/image?url=https%3A%2F%2Fdl.airtable.com%2F.attachmentThumbnails%2F75da7a62e42499f5e205ce7a8deeed7a%2F02a464cc&w=96&q=75",
    },
    {
      id: "ZVi8fWDBx",
      image:
        "https://scrapbook.hackclub.com/_next/image?url=https%3A%2F%2Fdl.airtable.com%2F.attachmentThumbnails%2F75da7a62e42499f5e205ce7a8deeed7a%2F02a464cc&w=96&q=75",
    },
    {
      id: "H-06WvsfJ",
      image:
        "https://scrapbook.hackclub.com/_next/image?url=https%3A%2F%2Fdl.airtable.com%2F.attachmentThumbnails%2F75da7a62e42499f5e205ce7a8deeed7a%2F02a464cc&w=96&q=75",
    },
    {
      id: "Fbc9iwnJl",
      image:
        "https://scrapbook.hackclub.com/_next/image?url=https%3A%2F%2Fdl.airtable.com%2F.attachmentThumbnails%2F75da7a62e42499f5e205ce7a8deeed7a%2F02a464cc&w=96&q=75",
    },
  ],
  links: [
    { source: "HkqEDLvxE", target: "011jVS4rb" },
    { source: "011jVS4rb", target: "PXACjDxmR" },
    { source: "PXACjDxmR", target: "kuVISwh7w" },
    { source: "PXACjDxmR", target: "Fbc9iwnJl" },
    { source: "PXACjDxmR", target: "UIEjvLJMd" },
    { source: "kuVISwh7w", target: "UIEjvLJMd" },
    { source: "UIEjvLJMd", target: "ZVi8fWDBx" },
    { source: "ZVi8fWDBx", target: "H-06WvsfJ" },
    { source: "H-06WvsfJ", target: "Fbc9iwnJl" },
  ],
};

const Node = ({ node }) => {
  return (
    <>
      <defs>
        <>
          <pattern
            id={node.id}
            x="0"
            y="0"
            height="100%"
            width="100%"
            viewBox="0 0 960 420"
            preserveAspectRatio="xMinYMid slice"
          >
            <image
              x="-270"
              y="11"
              width="960"
              height="420"
              xlink:href={node.image}
            />
          </pattern>
        </>
      </defs>
      <circle fill={"url(#"+node.id+")"} r="10" />
    </>
  );
};

export default function Home(props) {
  return (
    <div style={{ height: "100vh" }}>
      <Graph
        NodeComponent={Node}
        data={props}
        id="graph"
        {...{
          nodeDistance: 100,
          zoomDepth: 1,
          hoverOpacity: 0.3,
          enableDrag: true,
          pullIn: true,
        }}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  let users = await fetch("https://scrapbook.hackclub.com/api/users/").then(
    (r) =>
      r.json().then((users) =>
        users.map(({ id, avatar, webring }) => ({
          id,
          image: avatar,
          webring,
        }))
      )
  );
  const links = [];
  const included = [];
  users.map(({ id, image, webring }) =>
    webring.map((connection) => {
      links.push({ source: id, target: connection });
      included.push(connection);
    })
  );
  users = filter(users, (user) =>
    user.webring.length ? true : included.includes(user.id) ? true : false
  );

  return {
    props: { nodes: users, links },
  };
}
