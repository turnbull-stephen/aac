
import Editor from "@monaco-editor/react";
import * as yaml from 'js-yaml';
import React from 'react';

function MonacoYamlEditor({ editorRef, yamlEditData }) {
  const yamlString = yaml.dump(yamlEditData).trim();

  

  const handleEditorChange = (yamlContent) => {
    try {
      const jsonData = yaml.load(yamlContent);
      // Clear previous markers if any
      if (editorRef.current) {
        const model = editorRef.current.getModel();
        const monaco = window.monaco; // import monaco 
        monaco.editor.setModelMarkers(model, 'yaml', []);
      }

      // Optionally update your form state here if you want to auto-update as user types
      //reset(jsonData);

    } catch (error) {
      console.error("Invalid YAML content", error);
      // Set model markers to display the error in the editor
      if (editorRef.current && error.mark) {
        const model = editorRef.current.getModel();
        const monaco = window.monaco; // import monaco
        monaco.editor.setModelMarkers(model, 'yaml', [{
          startLineNumber: error.mark.line + 1,
          startColumn: error.mark.column + 1,
          endLineNumber: error.mark.line + 1,
          endColumn: error.mark.column + 1,
          message: error.message,
          severity: monaco.MarkerSeverity.Error,
        }]);
      }
    }
  };

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    // Configure the editor options
    editor.updateOptions({
      tabSize: 2,
    });
  }

  return (
    <div style={{ height: '100%', width: '100%'}}>
        <Editor
          height="100%" // Set height to 100% of the container
          width="100%"  // Set width to 100% of the container
          language="yaml"
          theme="vs-dark"
          value={yamlString}
          onMount={handleEditorDidMount}
          onChange={handleEditorChange} // Call the validation logic on content change
          options={{
            minimap: { enabled: true },
            tabSize: 2, // Set the tab size in the options as well
            insertSpaces: true, // Use spaces instead of tabs for indentation
          }}
        />

    </div>
  );
}

export default MonacoYamlEditor;