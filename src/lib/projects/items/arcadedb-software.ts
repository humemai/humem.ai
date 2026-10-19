import type { Project } from "../types";
import { arcadeDbDocsUrl, arcadeDbRepoUrl, arcadeDbUpstreamRepoUrl } from "../shared";

// The Software page of ArcadeDB: how to run it. The papers and benchmarks are on the Research page (arcadedb.ts).
export const arcadeDbSoftware: Project = {
  slug: "arcadedb-software",
  date: "2026-01-28",
  title: "ArcadeDB",
  editorialPage: {
    layout: "editorial",
    linksHeading: "Docs and code.",
    sections: [
      {
        id: "modes",
        navLabel: "Two ways to run it",
        eyebrow: "Run it",
        title: "Inside your process, or as a server.",
        body: [
          "ArcadeDB keeps documents, graphs, vectors, and time series in one engine, and you can run it two ways. Embedded, it runs inside your own process, with no service to start. As a server, other processes and machines reach the same data over HTTP or a database protocol.",
          "The engine is the same in both. Which one you use depends on how many processes need the data.",
        ],
      },
      {
        id: "embedded",
        navLabel: "Embedded",
        eyebrow: "Embedded",
        title: "Install it with pip.",
        body: [
          "For Python we maintain a package with the Java runtime bundled, so there is nothing else to install.",
          "~~~bash\npip install arcadedb-embedded\n~~~",
          "With uv, run `uv add arcadedb-embedded`. Schema and queries are SQL, or OpenCypher for graphs. A write needs a transaction, a read does not.",
          "~~~python\nimport arcadedb_embedded as arcadedb\n\nwith arcadedb.create_database(\"./mydb\") as db:\n    db.command(\"sql\", \"CREATE DOCUMENT TYPE Person\")\n    db.command(\"sql\", \"CREATE PROPERTY Person.name STRING\")\n\n    with db.transaction():\n        db.command(\"sql\", \"INSERT INTO Person SET name = ?\", \"Alice\")\n\n    for record in db.query(\"sql\", \"SELECT FROM Person\"):\n        print(record.get(\"name\"))\n~~~",
          "Use it for notebooks, tests, single-node services, and agent tooling. The docs have a walk-through for each kind of data, from a simple document store to vector search and graph algorithms.",
        ],
      },
      {
        id: "server",
        navLabel: "Server",
        eyebrow: "Server",
        title: "Start a server when other processes need the data.",
        body: [
          "From Python, you can start a server inside your process. Your code keeps its direct access, and everything else connects over HTTP. Studio, the web interface, opens in the browser.",
          "~~~python\nimport arcadedb_embedded as arcadedb\n\nwith arcadedb.create_server(\"./databases\", root_password=\"password123\") as server:\n    db = server.create_database(\"mydb\")\n    print(\"Studio:\", server.get_studio_url())\n~~~",
          "Pick your own password. That server stops when your script does. For one that keeps running, with replication or TLS, run the standalone server from the official image.",
          "~~~bash\ndocker run -d --name arcadedb -p 2480:2480 \\\n  -e JAVA_OPTS=\"-Darcadedb.server.rootPassword=playwithdata\" \\\n  arcadedata/arcadedb:latest\n~~~",
          "The on-disk format is compatible, so you can export a database from one and import it into the other. The standalone server also offers the Mongo and gRPC protocols, which the Python package does not bundle.",
        ],
      },
      {
        id: "benchmarks",
        navLabel: "Benchmarks",
        eyebrow: "Benchmarks",
        title: "How fast it is.",
        body: [
          "We benchmark ArcadeDB against the engines people use for each kind of data. The numbers, the settings, and the paper are on the [ArcadeDB research page](/research/arcadedb), and the cross-engine results are in [DBBench](/software/dbbench).",
        ],
      },
    ],
  },
  summary:
    "A database that keeps documents, graphs, vectors, and time series in one engine. Run it inside your Python process with pip, or as a server.",
  image: {
    src: "/images/projects/project-arcadedb.png",
    alt: "Illustration of a document, a triangle graph, vector arrows and a stepped time-series line in one frame around a rose circle at the center, standing for one engine that holds four kinds of data.",
  },
  problem: "",
  solution: "",
  links: [
    { label: "Python docs", href: arcadeDbDocsUrl },
    { label: "Python package", href: arcadeDbRepoUrl },
    { label: "ArcadeDB engine", href: arcadeDbUpstreamRepoUrl },
    { label: "ArcadeDB research page", href: "/research/arcadedb" },
  ],
};
