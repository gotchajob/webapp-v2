import { Editor } from '@tinymce/tinymce-react';

export const EnchantInput = ({ initValue, onChange, onBlur }: { initValue: string; onChange?: (value: string) => void; onBlur?: (value: string) => void }) => {

  const handleEditorChange = (content: string) => {
    if (onChange) {
      onChange(content);
    }
  };

  const handleEditorBlur = (e: any, editor: any) => {
    if (onBlur) {
      onBlur(editor.getContent());
    }
  };

  return (
    <Editor
      inline={true}
      onEditorChange={handleEditorChange}
      onBlur={handleEditorBlur}
      apiKey="atsnk5k74f1mqjagfaa22635gdyelbzbw6qqbw3f6b1vhtwj"
      initialValue={initValue}
      init={{
        width: 500,
        menubar: false,
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'code',
          'help',
          'wordcount'
        ],
        toolbar:
          'fontsize |' +
          'bold italic forecolor |' +
          'bullist numlist lineheight',
      }}
    />
  );
};
