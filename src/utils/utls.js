export const listAllNotes = (notes) => {
  notes.forEach(({id, content, tags}) => {
    console.log({id, content, tags });
    console.log('\n');
  });
}
