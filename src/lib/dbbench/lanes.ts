// The six DBBench lanes and which payload tables belong to each.
//
// The payload (src/data/arcadedb-benchmarks-next.json) names tables by id, not
// by lane, so this file is the one place that maps them. The first table of a
// lane is its headline: the project page shows that one and links to the lane
// page for the rest. A table id that the payload does not carry renders its
// "still being measured" line if the payload names one, and nothing otherwise.
//
// NO NUMBER IS TYPED INTO A SENTENCE HERE. Every figure lives in a table cell,
// generated from the rows. The prose says what a table measures and why.

export type DbbenchLaneTable = {
  tableId: string;
  caption: string;
  showDigests?: boolean;
};

export type DbbenchLane = {
  slug: "tables" | "graphs" | "vectors" | "time-series" | "cross-model" | "lifecycle";
  title: string;
  navLabel: string;
  /** One line for the lane list and the lane page hero. */
  blurb: string;
  /** Paragraphs above the tables on the lane page. */
  lead: string[];
  tables: DbbenchLaneTable[];
};

export const dbbenchLanes: DbbenchLane[] = [
  {
    slug: "tables",
    title: "Tables",
    navLabel: "Tables",
    blurb: "Documents and structured query language (SQL) analytics.",
    lead: [
      "Most people arrive with tables, so this lane comes first. The tasks are TPC-C and TPC-H from the Transaction Processing Performance Council, the standard transaction and analytics workloads. TPC-C is many small reads and writes. TPC-H is a few large scanning queries.",
      "Each engine answers the same question in its own query language: SQL where it has one, and its native language where it does not. The answers are hashed and compared before any time is published.",
    ],
    tables: [
      {
        tableId: "docs_oltp",
        caption:
          "Online transaction processing: TPC-C's new-order and payment transactions on the TPC-H tables, and the single-record insert, read, update, and delete beside them. Each column is a warm median; the ninety-ninth percentile is printed for new-order, the transaction this table leads with. There is no cold column of its own because every operation runs against an already-open, already-warm database by construction.",
      },
      {
        tableId: "docs_olap",
        caption:
          "Online analytical processing: five analytical queries over the same documents. The cold column is the first query of a session on a database that has just been opened, and every other latency column is the warm median of the iterations that follow it.",
      },
    ],
  },
  {
    slug: "graphs",
    title: "Graphs",
    navLabel: "Graphs",
    blurb: "Interactive and analytical queries on a social network graph.",
    lead: [
      "The tasks come from the Linked Data Benchmark Council's Social Network Benchmark. The interactive half reads a graph at several depths: a point lookup, one hop, two hops, and a three-hop read with a property filter. It also inserts, updates and deletes.",
      "The analytical half asks questions that touch the whole graph, such as the degree distribution and the triangle count. A triangle count returns one small number, so it is a strong answer check: if two engines disagree on it, one of them is wrong.",
      "Each engine is asked in the language it is normally asked in. A query that exceeds its time budget is published as censored, with its budget, and is never dropped.",
    ],
    tables: [
      {
        tableId: "l2",
        caption:
          "Graph interactive queries: point lookup, one hop, two hops, and a three-hop read with a property filter, with insert, update, and delete beside them. Warm medians, with the ninety-ninth percentile on the point lookup.",
      },
      {
        tableId: "l2olap",
        caption:
          "Graph analytical queries: average friend age, friendships within a city, most friends, the degree distribution, and the triangle count. A query that exceeds its time budget is published as censored, with its budget and the iterations it reached.",
      },
    ],
  },
  {
    slug: "vectors",
    title: "Vectors",
    navLabel: "Vectors",
    blurb: "Dense and sparse vector search, with recall beside every latency.",
    lead: [
      "Dense and sparse vectors are different problems with different engines behind them, so they get separate tables. Both report recall beside every latency. An approximate index can be made fast by returning worse answers, so a latency without the share of true neighbours it found is not a comparable number.",
      "Recall is measured against an exact brute-force answer over the same corpus. For an approximate index, agreeing with the exact answer is a stronger check than agreeing with another engine.",
      "Where an engine has the boundary, loading the data and building the index are timed separately. A search after inserting into a built index, and a search after deleting from one, are timed as well.",
    ],
    tables: [
      {
        tableId: "l3d",
        caption:
          "Dense search, and search after an insert and after a delete into the same built index, with recall beside each. Every row states what it stores, full precision or quantized, because a quantized index and a full-precision one are not the same measurement.",
      },
      {
        tableId: "l3s",
        caption:
          "Sparse search on real learned sparse vectors, with recall beside every latency. Loading and indexing are one timer on this table: the engines here build the index while ingesting, so the boundary the dense table splits does not exist.",
      },
    ],
  },
  {
    slug: "time-series",
    title: "Time series",
    navLabel: "Time series",
    blurb: "Monitoring-style queries over timestamped readings.",
    lead: [
      "The task is the Time Series Benchmark Suite on its CPU data set. The queries are the ones a monitoring stack asks: the newest reading per sensor, a twelve-hour aggregate, a double group-by over host and hour, a high-usage filter, and a grouped, ordered, limited query of the shape a dashboard issues.",
      "The ingest rate is its own column, separate from every query, because the two say nothing about each other. An engine with more than one way to store time series is measured through each way, not only the faster one.",
    ],
    tables: [
      {
        tableId: "l4",
        caption:
          "Every query this lane describes, with the ingest rate beside them. The cold column is the first query after the database is opened; the rest are warm medians.",
      },
    ],
  },
  {
    slug: "cross-model",
    title: "Cross-model",
    navLabel: "Cross-model",
    blurb: "One operation across a vector, a graph edge, and a document.",
    lead: [
      "Most lanes compare engines that do one thing. This lane asks what a single engine buys when one operation touches more than one data model. The comparators are other engines that hold several models and, beside them, a composed stack: separate stores with application code between them.",
      "The retrieval path is a vector search, a one-hop expansion from what it found, and a projection of the documents behind those. A second path restricts the vector search to the neighbourhood of a starting node. Both report recall against a brute-force answer over the same candidate set.",
      "The crash table is a correctness result, not a speed one. The same operation is interrupted part-way through, many times, and afterwards the store is asked what it holds. It has no latency column on purpose.",
    ],
    tables: [
      {
        tableId: "e2",
        caption:
          "The composed write, the retrieval path, and the graph-filtered vector search, with recall for the two read paths. The write is a transaction on the engines that have one and a sequence of calls on the stack that does not.",
      },
      {
        tableId: "e2atom",
        caption:
          "Interrupted composed operations, and how many of them left the store holding half of one. This table has no latency column on purpose: it is a correctness result, not a speed one.",
      },
      {
        tableId: "multimodel",
        caption:
          "Which multi-model engines have rows on which table, read from the published tables. Each cell says whether the engine was measured there, was left off with a reason the table itself prints, or was not run on that workload at all.",
        showDigests: false,
      },
    ],
  },
  {
    slug: "lifecycle",
    title: "Lifecycle",
    navLabel: "Lifecycle",
    blurb: "Opening, closing, deployment boundaries, and what waiting for the disk costs.",
    lead: [
      "These are the costs that nobody benchmarks and everybody pays. A session table opens a database, does one thing and closes it, for each kind of data the engine can hold, embedded and served. It is the cold measurement in its purest form.",
      "A second table separates the two costs of running a database in another process: turning the answer into a wire format, and crossing a process boundary. A third deployment in between, a server inside the same process, tells them apart.",
      "The durability table runs every timed write twice, once with the commit returning without waiting for the disk and once with the commit waiting for the log to be flushed and synced. It prints both with the ratio. Some engines have no such setting, and the table names them instead of comparing them against a setting they do not have.",
    ],
    tables: [
      {
        tableId: "lifecycle",
        caption:
          "A session for each kind of data, embedded and served. The embedded rows also carry what starting the process costs before the first database call, because an open measured inside an already-running process is not what someone launching a script pays.",
        showDigests: false,
      },
      {
        tableId: "e4",
        caption:
          "One projection answered at a range of result sizes by three deployments: in process, an HTTP server inside the same process, and a separate container. Read a row across to see which of the two costs grows with the answer.",
        showDigests: false,
      },
      {
        tableId: "durability",
        caption:
          "Every timed write at both durability settings, with the ratio, and the single-record read beneath the document writes as a control. The Size column names the operation rather than a corpus size, because the lanes that time a write do not write the same thing.",
        showDigests: false,
      },
    ],
  },
];

export function getDbbenchLane(slug: string): DbbenchLane | undefined {
  return dbbenchLanes.find((lane) => lane.slug === slug);
}
