import type { Project } from "../types";
import { arcadeDbEngineDocsUrl, arcadeDbUpstreamRepoUrl } from "../shared";

// The Software page of the ArcadeDB engine: how to run the official server. The package for Python is arcadedb-python-software.ts; the engine paper is on the Research page (arcadedb.ts); the benchmarks are in DBBench (dbbench.ts).
export const arcadeDbSoftware: Project = {
  slug: "arcadedb-software",
  title: "ArcadeDB",
  editorialPage: {
    layout: "editorial",
    linksHeading: "Docs and code.",
    sections: [

      {
        id: "what",
        navLabel: "What it is",
        eyebrow: "What it is",
        title: "One engine for several kinds of data.",
        body: [
          "ArcadeDB is a multi-model database. Documents, graphs, vectors, time series, key/value and full-text search live in one engine, on the same storage and the same write-ahead log. You do not run a separate system for each kind of data and write glue between them.",
          "You can ask it questions in SQL or openCypher, and the official server also speaks Gremlin, GraphQL, the MongoDB query language and Redis commands. A write that touches documents, edges and vectors is one transaction.",
          "You can run it two ways. As a server, other processes and machines reach it over HTTP or a database protocol. Embedded, it runs inside your own process with no service to start. It is the same engine in both, and [ArcadeDB in Python](/software/arcadedb-python) is the package for running it inside Python.",
        ],
      },

      {
        id: "server",
        navLabel: "Server",
        eyebrow: "Server",
        title: "Run the official server.",
        body: [
          "The official server comes from [arcadedb.com](https://arcadedb.com/). You can install it from a binary download, with Docker, or on Kubernetes. With Docker it is one command.",
          "~~~bash\ndocker run -d --name arcadedb -p 2480:2480 \\\n  -e JAVA_OPTS=\"-Darcadedb.server.rootPassword=playwithdata\" \\\n  arcadedata/arcadedb:latest\n~~~",
          "Pick your own password. The user is `root`. Studio, the web interface for running queries and browsing your data, opens at `http://localhost:2480`. The HTTP API is on the same port, so you can create a database and query it with curl.",
          "~~~bash\ncurl -u root:playwithdata -X POST http://localhost:2480/api/v1/server \\\n  -d '{\"command\": \"create database mydb\"}'\n\ncurl -u root:playwithdata -X POST http://localhost:2480/api/v1/command/mydb \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"language\": \"sql\", \"command\": \"CREATE DOCUMENT TYPE Person\"}'\n~~~",
          "Besides HTTP, the server can speak the PostgreSQL wire protocol, Neo4j Bolt (so Neo4j drivers work), Redis, MongoDB and gRPC. Choose the server when more than one process or machine needs the data, or when you need replication, failover or TLS.",
        ],
      },
      {
        id: "humemai",
        navLabel: "HumemAI",
        eyebrow: "HumemAI",
        title: "What HumemAI works on.",
        body: [
          "HumemAI sends fixes to the engine. We also run [DBBench](/research/dbbench), an open benchmark that measures ArcadeDB against the engines people use for each kind of data. The first results are published in November 2026.",
          "The [ArcadeDB research page](/research/arcadedb) covers the engine itself. [ArcadeDB in Python](/software/arcadedb-python) covers the Python package.",
        ],
      },
    ],
  },
  summary:
    "A database that keeps documents, graphs, vectors, and time series in one engine. Run the official server with one Docker command, and open Studio in your browser.",
  image: {
    src: "/images/projects/project-arcadedb.png",
    alt: "Illustration of a document, a triangle graph, vector arrows and a stepped time-series line in one frame around a rose circle at the center, standing for one engine that holds four kinds of data.",
  },
  problem: "",
  solution: "",
  links: [
    { label: "ArcadeDB website", href: "https://arcadedb.com/" },
    { label: "Docs", href: arcadeDbEngineDocsUrl },
    { label: "ArcadeDB engine", href: arcadeDbUpstreamRepoUrl },
    { label: "ArcadeDB research page", href: "/research/arcadedb" },
    { label: "ArcadeDB in Python software page", href: "/software/arcadedb-python" },
  ],
};
