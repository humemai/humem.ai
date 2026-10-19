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
        id: "server",
        navLabel: "Server",
        eyebrow: "Server",
        title: "Run the ArcadeDB server.",
        body: [
          "ArcadeDB keeps documents, graphs, vectors, and time series in one engine. The usual way to run it is the official server, from [arcadedb.com](https://arcadedb.com/). With Docker it is one command.",
          "~~~bash\ndocker run -d --name arcadedb -p 2480:2480 \\\n  -e JAVA_OPTS=\"-Darcadedb.server.rootPassword=playwithdata\" \\\n  arcadedata/arcadedb:latest\n~~~",
          "Pick your own password. Studio, the web interface, opens at `http://localhost:2480`, and your code connects over HTTP or one of the database protocols. This is the way to go when more than one process or machine needs the data, or when you need replication or TLS.",
        ],
      },
      {
        id: "embedded",
        navLabel: "Python",
        eyebrow: "Embedded",
        title: "Or run it inside Python.",
        body: [
          "We also maintain a Python package that runs the same engine inside your process, with the Java runtime bundled. There is no service to start.",
          "~~~bash\nuv add arcadedb-embedded\n~~~",
          "Schema and queries are SQL, or OpenCypher for graphs. A write needs a transaction, a read does not.",
          "~~~python\nimport arcadedb_embedded as arcadedb\n\nwith arcadedb.create_database(\"./mydb\") as db:\n    db.command(\"sql\", \"CREATE DOCUMENT TYPE Person\")\n    db.command(\"sql\", \"CREATE PROPERTY Person.name STRING\")\n\n    with db.transaction():\n        db.command(\"sql\", \"INSERT INTO Person SET name = ?\", \"Alice\")\n\n    for record in db.query(\"sql\", \"SELECT FROM Person\"):\n        print(record.get(\"name\"))\n~~~",
          "Use it for notebooks, tests, single-node services, and agent tooling. The docs have a walk-through for each kind of data, from a simple document store to vector search and graph algorithms.",
          "The package can also start a server from inside your Python process, with Studio, when other processes need to reach the data. That server stops when your script does. The on-disk format is the same as the official server's, so you can export a database from one and import it into the other.",
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
    "A database that keeps documents, graphs, vectors, and time series in one engine. Run the official server, or run it inside your Python process with uv.",
  image: {
    src: "/images/projects/project-arcadedb.png",
    alt: "Illustration of a document, a triangle graph, vector arrows and a stepped time-series line in one frame around a rose circle at the center, standing for one engine that holds four kinds of data.",
  },
  problem: "",
  solution: "",
  links: [
    { label: "ArcadeDB website", href: "https://arcadedb.com/" },
    { label: "Python docs", href: arcadeDbDocsUrl },
    { label: "Python package", href: arcadeDbRepoUrl },
    { label: "ArcadeDB engine", href: arcadeDbUpstreamRepoUrl },
    { label: "ArcadeDB research page", href: "/research/arcadedb" },
  ],
};
