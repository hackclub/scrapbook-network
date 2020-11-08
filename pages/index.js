import Head from "next/head";
import Graph from "react-graph-network";
import { orderBy, filter } from "lodash";
import Meta from "@hackclub/meta";

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
