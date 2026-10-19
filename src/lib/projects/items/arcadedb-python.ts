import type { Project } from "../types";
import { arcadeDbDocsUrl, arcadeDbRepoUrl } from "../shared";

export const arcadeDbPython: Project = {
  slug: "arcadedb-python",
  title: "ArcadeDB for Python",
  editorialPage: {
    layout: "editorial",
    linksHeading: "Docs and code.",
    sections: [
      {
        id: "install",
        navLabel: "Install",
        eyebrow: "Install",
        title: "One command, no server.",
        body: [
          "ArcadeDB is a database engine written in Java. This package puts it inside your Python process, with a Java runtime bundled, so there is nothing else to install and no service to start.",
          "~~~bash\npip install arcadedb-embedded\n~~~",
          "With uv, run `uv add arcadedb-embedded`. The package is Apache-2.0, like the engine.",
        ],
      },
      {
        id: "first-database",
        navLabel: "First database",
        eyebrow: "Use it",
        title: "Create a database and query it.",
        body: [
          "Schema and queries are SQL, or OpenCypher for graphs. A write needs a transaction, a read does not.",
          "~~~python\nimport arcadedb_embedded as arcadedb\n\nwith arcadedb.create_database(\"./mydb\") as db:\n    db.command(\"sql\", \"CREATE DOCUMENT TYPE Person\")\n    db.command(\"sql\", \"CREATE PROPERTY Person.name STRING\")\n\n    with db.transaction():\n        db.command(\"sql\", \"INSERT INTO Person SET name = ?\", \"Alice\")\n\n    for record in db.query(\"sql\", \"SELECT FROM Person\"):\n        print(record.get(\"name\"))\n~~~",
          "The same database holds documents, graphs, vectors, and time series. The docs have a walk-through for each, from a simple document store to vector search and graph algorithms.",
        ],
      },
      {
        id: "server",
        navLabel: "Server",
        eyebrow: "Share it",
        title: "Start a server when other processes need the data.",
        body: [
          "If another process, another language, or a browser has to reach the same data, start the bundled server from Python. Your process keeps its direct access, and Studio, the web interface, opens in the browser.",
          "~~~python\nimport arcadedb_embedded as arcadedb\n\nwith arcadedb.create_server(\"./databases\", root_password=\"password123\") as server:\n    db = server.create_database(\"mydb\")\n    print(\"Studio:\", server.get_studio_url())\n~~~",
          "Pick the password yourself. For a server that outlives your script, or that needs replication, run the official ArcadeDB server instead.",
        ],
      },
      {
        id: "benchmarks",
        navLabel: "Benchmarks",
        eyebrow: "Benchmarks",
        title: "How fast it is, and the paper.",
        body: [
          "The engine and this package are benchmarked against the engines people use for each kind of data. The numbers, the settings, and the paper are on the [ArcadeDB research page](/research/arcadedb), and the cross-engine results are in [DBBench](/software/dbbench).",
        ],
      },
    ],
  },
  summary:
    "Install ArcadeDB with pip and run it inside your own Python process. Documents, graphs, vectors, and time series in one engine, with no server to set up.",
  image: {
    src: "/images/projects/project-arcadedb.png",
    alt: "Illustration of a document, a triangle graph, vector arrows and a stepped time-series line in one frame around a rose circle at the center, standing for one engine that holds four kinds of data.",
  },
  problem: "",
  solution: "",
  links: [
    { label: "Python docs", href: arcadeDbDocsUrl },
    { label: "Python package", href: arcadeDbRepoUrl },
    { label: "PyPI", href: "https://pypi.org/project/arcadedb-embedded/" },
    { label: "ArcadeDB research page", href: "/research/arcadedb" },
  ],
};
