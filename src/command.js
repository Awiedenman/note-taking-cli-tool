import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { getAllNotes, newNote } from './notes.js';
import { listAllNotes } from './utils/utls.js';


// sets up commands to be used in the CLI tool.

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
    listAllNotes(allNotes);
  })
  .command('find <filter>', 'get matching notes', yargs => {
    return yargs.positional('filter', {
      describe: 'The search term to filter notes by, will be applied to note.content',
      type: 'string'
    })
  }, async (argv) => {

  })
  .command('remove <id>', 'remove a note by id', yargs => {
    return yargs.positional('id', {
      type: 'number',
      description: 'The id of the note you want to remove'
    })
  }, async (argv) => {

  })
  .command('web [port]', 'launch website to see notes', yargs => {
    return yargs
      .positional('port', {
        describe: 'port to bind on',
        default: 5000,
        type: 'number'
      })
  }, async (argv) => {

  })
  .command('clean', 'remove all notes', () => {}, async (argv) => {

  })
  .demandCommand(1) // must have 1 command
  .parse() // runs the command
