import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import 'ckeditor5/ckeditor5.css';
import {
    ClassicEditor,
    Bold,
    Essentials,
    Heading,
    Indent,
    IndentBlock,
    Italic,
    Link,
    List,
    MediaEmbed,
    Paragraph,
    Table,
    Undo
} from 'ckeditor5';

interface RichTextEditorComponentProps {
    initialData?: string;
    onChange?: (event: Event, editor: any) => void;
}

const RichTextEditorComponent: React.FC<RichTextEditorComponentProps> = ({ initialData = '<h1>Hello from CKEditor 5!</h1>' }) => {
    return (
        <CKEditor
            editor={ClassicEditor}
            config={{
                toolbar: [
                    'undo', 'redo', '|',
                    'heading', '|', 'bold', 'italic', '|',
                    'link', 'insertTable', 'mediaEmbed', '|',
                    'bulletedList', 'numberedList', 'indent', 'outdent'
                ],
                plugins: [
                    Bold,
                    Essentials,
                    Heading,
                    Indent,
                    IndentBlock,
                    Italic,
                    Link,
                    List,
                    MediaEmbed,
                    Paragraph,
                    Table,
                    Undo
                ],
                initialData,
            }}
            // onChange={onChange}
        />
    );
};

export default RichTextEditorComponent;