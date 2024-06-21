import { Editor } from '@tinymce/tinymce-react';

export const EnchantInput = ({ initValue, onChange, onBlur }: { initValue: string; onChange?: (value: string) => void; onBlur?: (value: string) => void }) => {

  // const handleEditorChange = (e: any) => {
  //   console.log('Content was updated:', e); // In ra nội dung hiện tại của editor
  //   // if (onChange) {
  //   //   onChange(content); // Gọi hàm onChange nếu được truyền vào từ props
  //   // }
  // };

  const handleEditorChange = (content: string) => {
    if (onChange) {
      onChange(content);
    }
  };

  const handleEditorBlur = (e: any, editor: any) => {
    // console.log('Editor blurred', editor.getContent());
    if (onBlur) {
      onBlur(editor.getContent());
    }
  };

  return (
    <Editor
      inline={true}
      // onEditorChange={(e: any) => handleEditorChange(e)}
      onEditorChange={handleEditorChange}
      onBlur={handleEditorBlur}
      apiKey="e2f3pntb5ogxx9hu1lba5p8ef4c29vnogx4n8lid5dw71i4v"
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
          'undo redo  | ' +
          'fontsize |' +
          'bold italic forecolor |' +
          'bullist numlist |',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
    />
  );
};
