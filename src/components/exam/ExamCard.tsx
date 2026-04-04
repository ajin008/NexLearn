import Button from "@/src/components/ui/Button";

interface ExamMeta {
  questions_count: number;
  total_marks: number;
  total_time: number;
  instruction?: string;
}

interface Props {
  meta: ExamMeta | null;
  loading: boolean;
  onStart: () => void;
}

const DEFAULT_INSTRUCTIONS = [
  "You have 100 minutes to complete the test.",
  "Test consists of 100 multiple choice questions.",
  "Each correct answer carries 1 mark.",
  "There is no negative marking.",
  "Do not use any external resources.",
  "Complete the test to accurately assess your proficiency level.",
  "Check answers before submitting.",
];

export default function ExamCard({ meta, loading, onStart }: Props) {
  const stats = [
    { label: "Total MCQ's:", value: meta?.questions_count ?? "—" },
    { label: "Total marks:", value: meta?.total_marks ?? "—" },
    { label: "Total time:", value: meta ? `${meta.total_time}:00` : "—" },
  ];

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-10">
      <div className="rounded-2xl  max-w-2xl p-8">
        {/* Title */}
        <h1 className="text-xl font-bold text-gray-800 text-center mb-6">
          Ancient Indian History MCQ
        </h1>

        {/* Stats — single dark card with dividers */}
        <div
          className="rounded-xl text-white flex divide-x divide-white/20 mb-8"
          style={{ background: "linear-gradient(135deg, #1c3141, #2b4b63)" }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex-1 text-center py-5 px-4">
              <p className="text-xs font-semibold opacity-80 mb-2">
                {stat.label}
              </p>
              <p className="text-4xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-800 mb-3">
            Instructions:
          </h2>
          {meta?.instruction ? (
            <div
              className="text-sm text-gray-600 leading-relaxed [&_ol]:list-decimal [&_ol]:list-outside [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_li]:text-sm [&_li]:text-gray-600"
              dangerouslySetInnerHTML={{ __html: meta.instruction }}
            />
          ) : (
            <ol className="list-decimal list-outside pl-5 space-y-1.5">
              {DEFAULT_INSTRUCTIONS.map((item, i) => (
                <li key={i} className="text-sm text-gray-600">
                  {item}
                </li>
              ))}
            </ol>
          )}
        </div>

        {/* Start button */}
        <Button
          onClick={onStart}
          loading={loading}
          className="w-full py-3 text-base"
        >
          Start Test
        </Button>
      </div>
    </main>
  );
}
