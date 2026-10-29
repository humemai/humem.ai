import type { Project } from "../types";
import { arcadeDbDocsUrl, arcadeDbRepoUrl } from "../shared";

// The Software page of the Python package: how to install and use it. The engine is arcadedb-software.ts; the paper about the package is on the Research page (arcadedb-python.ts).
export const arcadeDbPythonSoftware: Project = {
  slug: "arcadedb-python-software",
  title: "ArcadeDB in Python",
  editorialPage: {
    layout: "editorial",
    linksHeading: "Docs and code.",
    sections: [
      {
        id: "what",
        navLabel: "What it is",
        eyebrow: "What it is",
        title: "ArcadeDB inside your Python process.",
        body: [
          "ArcadeDB in Python is the Python package for [ArcadeDB](/software/arcadedb). It runs the same engine inside your process, so there is no service to start. We maintain it within the ArcadeDB project, in [ArcadeData/arcadedb-python](https://github.com/ArcadeData/arcadedb-python).",
          "The default package, `arcadedb`, is a native build that needs no Java. `arcadedb-jvm` bundles a Java runtime instead, for heavy, long-running loads. Both use `import arcadedb`.",
        ],
      },

      {
        id: "embedded",
        navLabel: "Install",
        eyebrow: "Install",
        title: "Install it and run a query.",
        body: [
          "~~~bash\nuv add arcadedb\n~~~",
          "Schema and queries are SQL, or openCypher for graphs. A write needs a transaction. A read does not.",
          "~~~python\nimport arcadedb\n\nwith arcadedb.create_database(\"./mydb\") as db:\n    db.command(\"sql\", \"CREATE DOCUMENT TYPE Person\")\n    db.command(\"sql\", \"CREATE PROPERTY Person.name STRING\")\n\n    with db.transaction():\n        db.command(\"sql\", \"INSERT INTO Person SET name = ?\", \"Alice\")\n\n    for record in db.query(\"sql\", \"SELECT FROM Person\"):\n        print(record.get(\"name\"))\n~~~",
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
          "~~~python\ndb.command(\"sql\", \"CREATE VERTEX TYPE Doc\")\ndb.command(\"sql\", \"CREATE PROPERTY Doc.text STRING\")\ndb.command(\"sql\", \"CREATE PROPERTY Doc.embedding ARRAY_OF_FLOATS\")\ndb.command(\"sql\", \"\"\"\n    CREATE INDEX ON Doc (embedding)\n    LSM_VECTOR\n    METADATA {\"dimensions\": 3, \"similarity\": \"COSINE\"}\n\"\"\")\n\nrows = db.query(\n    \"sql\",\n    \"SELECT vectorNeighbors('Doc[embedding]', :vec, 2) AS res\",\n    {\"vec\": [0.9, 0.1, 0.0]},\n).to_list()\n~~~",
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
          "For documents and rows, `db.insert_many(...)` batches rows across the Java boundary, and `db.insert_columns(...)` takes a DataFrame or numpy arrays. For graphs, use `GraphBatch`. Against a server, use `POST /api/v1/batch/{db}` for graphs and the line-protocol endpoint for time series.",
          "`IMPORT DATABASE` loads CSV, XML, RDF, Neo4j exports and ArcadeDB backups, and `EXPORT DATABASE` writes one. Create indexes after a big load where you can.",
        ],
      },
      {
        id: "paper",
        navLabel: "Paper",
        eyebrow: "Paper",
        title: "The design and the measurements.",
        body: [
          "Our SciPy paper describes the bindings and measures them against SQLite, DuckDB, LadybugDB, and Chroma. It is on the [ArcadeDB in Python research page](/research/arcadedb-python).",
        ],
      },
    ],
  },
  summary:
    "The Python package for ArcadeDB. It runs the engine inside your process, for documents, graphs, vectors and time series, with no service to start. Install it with uv.",
  image: {
    src: "/images/projects/project-arcadedb-python.png",
    alt: "Illustration of three stacked slabs with the middle one in rose, inside a larger outlined square, standing for a database running inside a process.",
  },
  problem: "",
  solution: "",
  links: [
    { label: "Python docs", href: arcadeDbDocsUrl },
    { label: "Python package", href: arcadeDbRepoUrl },
    { label: "PyPI", href: "https://pypi.org/project/arcadedb/" },
    { label: "ArcadeDB in Python research page", href: "/research/arcadedb-python" },
    { label: "ArcadeDB software page", href: "/software/arcadedb" },
  ],
};
