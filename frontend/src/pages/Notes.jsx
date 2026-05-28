function Notes({
  notes,
  noteContent,
  setNoteContent,
  handleAddNote,
  handleDeleteNote,
}) {

  return (

    <div>

      <h1 className="text-4xl font-bold mb-2">
        Notes
      </h1>

      <p className="text-gray-500 mb-8">
        Store your ideas and thoughts
      </p>

      {/* ADD NOTE */}

      <div className="bg-white p-6 rounded-2xl shadow mb-8">

        <textarea
          rows="5"
          placeholder="Write your note..."
          value={noteContent}
          onChange={(e) =>
            setNoteContent(e.target.value)
          }
          className="w-full border p-4 rounded-xl mb-4"
        />

        <button
          onClick={handleAddNote}
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          Add Note
        </button>

      </div>

      {/* NOTES */}

      <div className="space-y-4">

        {notes.map((note, index) => (

          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow"
          >

            <div className="flex justify-between items-start">

              <p className="whitespace-pre-wrap">
                {note.content}
              </p>

              <button
                onClick={() =>
                  handleDeleteNote(note.id)
                }
                className="text-red-500"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Notes;