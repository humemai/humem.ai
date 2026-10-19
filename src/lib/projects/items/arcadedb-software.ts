import type { Project } from "../types";
import { arcadeDbDocsUrl, arcadeDbRepoUrl, arcadeDbUpstreamRepoUrl } from "../shared";

// The Software page of ArcadeDB: how to run it. The papers and benchmarks are on the Research page (arcadedb.ts).
export const arcadeDbSoftware: Project = {
  slug: "arcadedb-software",
  date: "2025-10-17",
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
          "You can run it two ways. As a server, other processes and machines reach it over HTTP or a database protocol. Embedded, it runs inside your own process with no service to start. It is the same engine in both.",
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
        id: "embedded",
        navLabel: "Python",
        eyebrow: "Embedded",
        title: "Or run it inside Python.",
        body: [
          "We maintain a Python package that runs the same engine inside your process, with the Java runtime bundled. There is nothing else to install and no service to start.",
          "~~~bash\nuv add arcadedb-embedded\n~~~",
          "Schema and queries are SQL, or openCypher for graphs. A write needs a transaction. A read does not.",
          "~~~python\nimport arcadedb_embedded as arcadedb\n\nwith arcadedb.create_database(\"./mydb\") as db:\n    db.command(\"sql\", \"CREATE DOCUMENT TYPE Person\")\n    db.command(\"sql\", \"CREATE PROPERTY Person.name STRING\")\n\n    with db.transaction():\n        db.command(\"sql\", \"INSERT INTO Person SET name = ?\", \"Alice\")\n\n    for record in db.query(\"sql\", \"SELECT FROM Person\"):\n        print(record.get(\"name\"))\n~~~",
          "Use it for notebooks, tests, single-node services and agent tooling. Only one process can open an embedded database at a time. When a second process needs the data, start a server from the same package, with Studio.",
          "~~~python\nwith arcadedb.create_server(\"./databases\", root_password=\"password123\") as server:\n    db = server.create_database(\"mydb\")\n    print(\"Studio:\", server.get_studio_url())\n~~~",
          "Your code keeps its direct access and everything else connects over HTTP. That server stops when your script does. The on-disk format is the same as the official server’s, so you can export a database from one and import it into the other.",
        ],
      },
      {
        id: "graphs",
        navLabel: "Graphs",
        eyebrow: "Graphs",
        title: "Vertices, edges and traversals.",
        body: [
          "Graphs are property graphs. You declare vertex and edge types, then connect vertices that already exist.",
          "~~~python\nwith db.transaction():\n    db.command(\"sql\", \"CREATE VERTEX TYPE Person\")\n    db.command(\"sql\", \"CREATE EDGE TYPE Knows\")\n    db.command(\"sql\", \"INSERT INTO Person SET name = 'Alice'\")\n    db.command(\"sql\", \"INSERT INTO Person SET name = 'Bob'\")\n    db.command(\"sql\", \"\"\"\n        CREATE EDGE Knows\n        FROM (SELECT FROM Person WHERE name = 'Alice')\n        TO (SELECT FROM Person WHERE name = 'Bob')\n    \"\"\")\n~~~",
          "If either end matches nothing, no edge is created and there is no error, so check what the subqueries return. You can traverse with SQL or with openCypher.",
          "~~~python\nresult = db.query(\"opencypher\", \"\"\"\n    MATCH (p:Person {name: $name})-[:Knows]->(friend:Person)\n    RETURN friend.name\n\"\"\", {\"name\": \"Alice\"})\n~~~",
          "An edge type is two-way by default. Declare it `UNIDIRECTIONAL` only when you never query it from the target. For a large graph, load it with `GraphBatch` instead of one statement at a time. In our measurements it loaded 50,000 vertices and about a million edges in roughly 7.5 seconds, against about 30 seconds one element at a time.",
        ],
      },
      {
        id: "vectors",
        navLabel: "Vectors",
        eyebrow: "Vectors",
        title: "Store embeddings and search them.",
        body: [
          "You bring the embeddings, from any model. A vector index is created in SQL, and the search is a SQL function, so it combines with filters and graph traversals in the same query.",
          "~~~python\nfrom arcadedb_embedded import to_java_float_array\n\ndb.command(\"sql\", \"CREATE VERTEX TYPE Doc\")\ndb.command(\"sql\", \"CREATE PROPERTY Doc.text STRING\")\ndb.command(\"sql\", \"CREATE PROPERTY Doc.embedding ARRAY_OF_FLOATS\")\ndb.command(\"sql\", \"\"\"\n    CREATE INDEX ON Doc (embedding)\n    LSM_VECTOR\n    METADATA {\"dimensions\": 3, \"similarity\": \"COSINE\"}\n\"\"\")\n\nrows = db.query(\n    \"sql\",\n    \"SELECT vectorNeighbors('Doc[embedding]', ?, 2) AS res\",\n    to_java_float_array([0.9, 0.1, 0.0]),\n).to_list()\n~~~",
          "The index is built with JVector. The number of dimensions must match your embeddings. The search beam trades recall against speed, so set it for the recall you need. The docs also cover quantization, INT8 storage and sparse vectors.",
        ],
      },
      {
        id: "timeseries",
        navLabel: "Time series",
        eyebrow: "Time series",
        title: "Samples with tags and fields.",
        body: [
          "A time series type has a timestamp, tags for the low-cardinality labels, and numeric fields. You create it in SQL.",
          "~~~sql\nCREATE TIMESERIES TYPE Reading TIMESTAMP ts\n  TAGS (sensor STRING) FIELDS (value DOUBLE)\n~~~",
          "You can write samples with plain SQL, or in bulk over HTTP with InfluxDB line protocol, one sample per line.",
          "~~~bash\ncurl -u root:playwithdata -X POST \\\n  'http://localhost:2480/api/v1/ts/mydb/write?precision=s' \\\n  -H 'Content-Type: text/plain' \\\n  --data-binary 'Reading,sensor=s1 value=1.0 1700000000'\n~~~",
          "Queries are SQL, with `ts.timeBucket()` to group samples into buckets such as hours. If your main query is an hourly aggregate, create the type with `COMPACTION_INTERVAL 1 HOURS`.",
        ],
      },
      {
        id: "loading",
        navLabel: "Loading data",
        eyebrow: "Loading",
        title: "Getting a lot of data in.",
        body: [
          "For documents and rows, `db.insert_many(...)` batches rows across the Java boundary, and `db.insert_columns(...)` takes a DataFrame or numpy arrays and is faster still. For graphs, use `GraphBatch`. Against a server, use `POST /api/v1/batch/{db}` for graphs and the line-protocol endpoint for time series.",
          "`IMPORT DATABASE` loads CSV, XML, RDF, Neo4j exports and ArcadeDB backups, and `EXPORT DATABASE` writes one. Create indexes after a big load where you can.",
        ],
      },
      {
        id: "benchmarks",
        navLabel: "Benchmarks",
        eyebrow: "Benchmarks",
        title: "How fast it is.",
        body: [
          "We benchmark ArcadeDB against the engines people use for each kind of data. The numbers, the settings and the paper are on the [ArcadeDB research page](/research/arcadedb), and the cross-engine results are in [DBBench](/software/dbbench).",
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
