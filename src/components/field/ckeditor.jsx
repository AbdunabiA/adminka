import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ckeditor = ({ field: { name, value }, form: { setFieldValue }, label }) => {
  return (
    <div className="mb-5 [&_.ck-rounded-coders]:min-h-[400px] [&_.ck-rounded-corders]:overflow-y-scroll">
      {label ? <h4>{label}</h4> : null}
      <CKEditor
        editor={ClassicEditor}
        // config={editorConfiguration}
        data={value}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        config={{}}
        onChange={(event, editor) => {
          const data = editor.getData();
          setFieldValue(name, data);
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
    </div>
  );
};

export default ckeditor;
