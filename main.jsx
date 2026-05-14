export default function BhagavadGitaWebsite() { const chapters = [ { id: 1, name: "Arjuna Vishada Yoga", slokas: 47, slokaLines: { 1: "Dhritarashtra uvacha...", 2: "Sanjaya uvacha...", }, }, { id: 2, name: "Sankhya Yoga", slokas: 72, slokaLines: { 1: "Sri Bhagavan uvacha...", }, }, { id: 3, name: "Karma Yoga", slokas: 43, slokaLines: {} }, { id: 4, name: "Jnana Karma Sanyasa Yoga", slokas: 42, slokaLines: {}, }, { id: 5, name: "Karma Sanyasa Yoga", slokas: 29, slokaLines: {}, }, { id: 6, name: "Dhyana Yoga / Atma Samyama Yoga", slokas: 47, slokaLines: {}, }, { id: 7, name: "Jnana Vijnana Yoga", slokas: 30, slokaLines: {}, }, { id: 8, name: "Akshara Brahma Yoga", slokas: 28, slokaLines: {}, }, { id: 9, name: "Raja Vidya Raja Guhya Yoga", slokas: 34, slokaLines: {}, }, { id: 10, name: "Vibhuti Yoga", slokas: 42, slokaLines: {}, }, { id: 11, name: "Visvarupa Darsana Yoga", slokas: 55, slokaLines: {}, }, { id: 12, name: "Bhakti Yoga", slokas: 20, slokaLines: {}, }, { id: 13, name: "Ksetra-Ksetrajna Vibhaga Yoga", slokas: 34, slokaLines: {}, }, { id: 14, name: "Gunatraya-Vibhaga Yoga", slokas: 27, slokaLines: {}, }, { id: 15, name: "Purusottama Yoga", slokas: 20, slokaLines: {}, }, { id: 16, name: "Daivasura-Sampad-Vibhaga Yoga", slokas: 24, slokaLines: {}, }, { id: 17, name: "Sraddhatraya-Vibhaga Yoga", slokas: 28, slokaLines: {}, }, { id: 18, name: "Moksha-Sannyasa Yoga", slokas: 78, slokaLines: {}, }, ];

const [selectedChapter, setSelectedChapter] = React.useState(null); const [practiceOpen, setPracticeOpen] = React.useState(false); const [result, setResult] = React.useState(null);

const [practiceSettings, setPracticeSettings] = React.useState( chapters.map((chapter) => ({ chapterId: chapter.id, enabled: true, start: 1, end: chapter.slokas, })) );

const generateRandom = () => { const enabled = practiceSettings.filter((c) => c.enabled);

if (enabled.length === 0) {
  alert("Please select at least one chapter");
  return;
}

const randomChapter =
  enabled[Math.floor(Math.random() * enabled.length)];

const randomSloka =
  Math.floor(
    Math.random() *
      (randomChapter.end - randomChapter.start + 1)
  ) + randomChapter.start;

const chapterData = chapters.find(
  (c) => c.id === randomChapter.chapterId
);

const firstLine =
  chapterData.slokaLines[randomSloka] ||
  "Paste first line of this sloka later...";

setResult({
  chapter: chapterData.id,
  chapterName: chapterData.name,
  sloka: randomSloka,
  firstLine,
});

};

const updateSetting = (chapterId, field, value) => { setPracticeSettings((prev) => prev.map((item) => item.chapterId === chapterId ? { ...item, [field]: value } : item ) ); };

return ( <div className="min-h-screen bg-orange-50 p-6"> <div className="max-w-7xl mx-auto"> <div className="bg-orange-500 text-white rounded-3xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4"> <div> <h1 className="text-4xl font-bold"> Bhagavad Gita Learning Portal </h1> <p className="mt-2 text-orange-100"> Learn Slokas • Practice Daily • Win Gold Medal </p> </div>

<button
        onClick={() => setPracticeOpen(true)}
        className="bg-white text-orange-600 px-6 py-3 rounded-2xl font-bold hover:scale-105 transition"
      >
        Practice
      </button>
    </div>

    {!selectedChapter && (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            onClick={() => setSelectedChapter(chapter)}
            className="bg-white rounded-3xl p-6 shadow-lg cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition"
          >
            <div className="text-orange-500 text-lg font-bold">
              Chapter {chapter.id}
            </div>

            <h2 className="text-2xl font-bold mt-2">
              {chapter.name}
            </h2>

            <div className="mt-4 text-gray-600 font-semibold">
              {chapter.slokas} Slokas
            </div>
          </div>
        ))}
      </div>
    )}

    {selectedChapter && (
      <div className="mt-10">
        <button
          onClick={() => setSelectedChapter(null)}
          className="mb-6 bg-orange-500 text-white px-5 py-2 rounded-xl"
        >
          ← Back to Chapters
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-4xl font-bold text-orange-600">
            Chapter {selectedChapter.id}
          </h2>

          <p className="text-2xl mt-2 font-semibold text-gray-700">
            {selectedChapter.name}
          </p>

          <div className="mt-8 space-y-5">
            {Array.from({ length: selectedChapter.slokas }).map(
              (_, index) => (
                <div
                  key={index}
                  className="bg-orange-50 border border-orange-200 rounded-2xl p-5"
                >
                  <h3 className="font-bold text-lg text-orange-600">
                    Sloka {index + 1}
                  </h3>

                  <div className="mt-3 text-gray-700 leading-8">
                    <div>Line 1 Placeholder</div>
                    <div>Line 2 Placeholder</div>
                    <div>Line 3 Placeholder</div>
                    <div>Line 4 Placeholder</div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    )}

    {practiceOpen && (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
        <div className="bg-white rounded-3xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-orange-600">
              Practice Mode
            </h2>

            <button
              onClick={() => setPracticeOpen(false)}
              className="bg-red-500 text-white px-4 py-2 rounded-xl"
            >
              Close
            </button>
          </div>

          <div className="space-y-5">
            {chapters.map((chapter) => {
              const settings = practiceSettings.find(
                (s) => s.chapterId === chapter.id
              );

              return (
                <div
                  key={chapter.id}
                  className="border rounded-2xl p-4"
                >
                  <div className="flex flex-col lg:flex-row gap-4 justify-between lg:items-center">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={settings.enabled}
                        onChange={(e) =>
                          updateSetting(
                            chapter.id,
                            "enabled",
                            e.target.checked
                          )
                        }
                      />

                      <div>
                        <div className="font-bold">
                          Chapter {chapter.id}
                        </div>

                        <div className="text-gray-600 text-sm">
                          {chapter.name}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span>From</span>

                      <input
                        type="number"
                        min="1"
                        max={chapter.slokas}
                        value={settings.start}
                        onChange={(e) =>
                          updateSetting(
                            chapter.id,
                            "start",
                            Number(e.target.value)
                          )
                        }
                        className="border rounded-lg px-3 py-2 w-24"
                      />

                      <span>To</span>

                      <input
                        type="number"
                        min="1"
                        max={chapter.slokas}
                        value={settings.end}
                        onChange={(e) =>
                          updateSetting(
                            chapter.id,
                            "end",
                            Number(e.target.value)
                          )
                        }
                        className="border rounded-lg px-3 py-2 w-24"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={generateRandom}
            className="mt-8 w-full bg-orange-500 text-white py-4 rounded-2xl text-xl font-bold hover:bg-orange-600 transition"
          >
            Generate Random Sloka
          </button>

          {result && (
            <div className="mt-8 bg-orange-100 rounded-3xl p-8 text-center">
              <h3 className="text-2xl font-bold text-orange-600">
                Practice This
              </h3>

              <div className="mt-5 text-4xl font-bold">
                Chapter {result.chapter}
              </div>

              <div className="mt-2 text-xl text-gray-700">
                {result.chapterName}
              </div>

              <div className="mt-6 text-5xl font-extrabold text-orange-500">
                Sloka {result.sloka}
              </div>

              <div className="mt-8 bg-white rounded-2xl p-6 shadow-md">
                <div className="text-lg font-semibold text-gray-700 mb-3">
                  First Line of Sloka
                </div>

                <div className="text-2xl font-bold text-orange-700 leading-relaxed">
                  {result.firstLine}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )}
  </div>
</div>

); }
