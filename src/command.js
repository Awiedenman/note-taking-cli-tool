import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { getAllNotes, newNote, findNotes, removeNote, removeAllNotes } from './notes.js';
import { listNotes } from './utils/utls.js';
import { start } from './server.js';


// Sets up commands to be used in the CLI tool;

yargs(hideBin(process.argv))
  .command('new <note>', 'create a new note', yargs => {
    return yargs.positional('note', {
      type: 'string',
      description: 'create note'
    })
  }, async(argv) => {
      const tags = argv.tags ? argv.tags.split(',') : [];
      const note = newNote(argv.note, tags);
      console.log('NOTE:: ', note);
  })
  .option('tags', {
    alias: 't',
    type: 'string',
    description: 'tags to add to the note'
  })
  .command('all', 'get all notes', () => {}, async (argv) => {
    const allNotes = await getAllNotes();
    console.log('ALLLLLLLL NOTES: ', allNotes)
    listNotes(allNotes);
  })
  .command('find <filter>', 'get matching notes', yargs => {
    return yargs.positional('filter', {
      describe: 'The search term to filter notes by, will be applied to note.content',
      type: 'string'
    })
  }, async (argv) => {
    const matches = await findNotes(argv.filter);
    listNotes(matches)
  })
  .command('remove <id>', 'remove a note by id', yargs => {
    return yargs.positional('id', {
      type: 'number',
      description: 'The id of the note you want to remove'
    })
  }, async (argv) => {
    const allNotes = await getAllNotes();
    if (allNotes.find(note=> note.id === argv.id) ) {
      await removeNote(argv.id);
      console.log(`Note:${argv.id} was removed sucessfully!`) //fix this
    } else {
      console.log(`Note ID not found, please try again!`)

    }
  })
  .command('clean', 'remove all notes', () => {}, async (argv) => {
    await removeAllNotes();
    console.log('DB reset')
  })
  .command('web [port]', 'launch website to view notes', yargs => {
    return yargs.positional('port', {
      describe: 'port to bind on',
      default: 4001,
      type: 'number',
    })
  }, async(argv)=> {
    const notes = await getAllNotes();
    start(notes, argv.port)
  })
  .demandCommand(1) // must have 1 command
  .parse() // runs the command
