import Head from "next/head";
import styles from "../styles/Home.module.css";
import Graph from "react-graph-network";
import { orderBy, filter } from "lodash";
import Meta from "@hackclub/meta";
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
      <a href={`https://scrapbook.hackclub.com/${node.username}`}>
      <circle fill={"url(#" + node.id + ")"} r="10" /></a>
    </>
  );
};

export default function Home(props) {
  return (
    <div style={{ height: "90vh" }}>
      <Meta
        as={Head} // component to wrap tags in, defaults to React.Fragment
        name="Hack Club Scrapbook"
        title="The Network" // page title
        description="Representation of the network created by Scrapbook's webring feature." // page description
        image="https://cloud-huqig4hfu.vercel.app/0screenshot_2020-11-08_at_12.34.11_pm.png" // large summary image URL
        color="#ec3750" // theme color
      />
      <Graph
        NodeComponent={Node}
        data={props}
        id="graph"
        {...{
          nodeDistance: 100,
          zoomDepth: 3,
          hoverOpacity: 0.3,
          enableDrag: true,
          pullIn: false,
        }}
      />
      <aside className="container banner">
        <p className="post-text">
          Representation of the network created by{" "}
          <a href="https://scrapbook.hackclub.com">Scrapbook</a>'s webring
          feature.
        </p>
        <style jsx>{`
          .banner {
            padding: 0px 24px 12px;
            border-radius: 12px;
            max-width: 720px;
            background-color: var(--colors-orange);
            color: var(--colors-white);
            margin: 12px auto 24px;
            text-align: center;
          }
          .post-text {
            line-height: 1.375;
          }
          .post-text a {
            color: inherit;
            font-weight: bold;
          }
        `}</style>
      </aside>
    </div>
  );
}

export async function getStaticProps(context) {
  let users = await fetch("https://scrapbook.hackclub.com/api/users/").then(
    (r) =>
      r.json().then((users) =>
        users.map(({ id, avatar, webring, username }) => ({
          id,
          image: avatar,
          webring,
          username
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
    revalidate: 1,
  };
}
