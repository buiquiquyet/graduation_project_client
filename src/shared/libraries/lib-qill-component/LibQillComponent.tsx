import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
interface LibQillComponentProps {
    content: string, // giá trị value
    onChange: (text: string) => void,

}
// custom văn bản đa dạn
const LibQillComponent : React.FC<LibQillComponentProps> = ({content, onChange}) => {
    return (
        <div className='w-100'>
            <ReactQuill
                value={ content}
                onChange={onChange}
                modules={{
                    toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    [{'header': [1, 2, 3, 4, 5, 6, false]}],
                    [{'list': 'ordered'}, {'list': 'bullet'}],
                    [{'indent': '-1'}, {'indent': '+1'}],
                    ['link', 'image', 'video'],
                    ['clean'],
                    ['code-block'],
                    ['formula'],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'align': [] }],
                    
                    ],
                }}
                formats={[
                    'font', 'size', 'header',
                    'bold', 'italic', 'underline', 'strike', 'blockquote',
                    'color', 'background',
                    'script', 'sub', 'super',
                    'list', 'bullet', 'indent',
                    'direction', 'align',
                    'link', 'image', 'video', 'formula',
                    'clean', 'code-block'
                  ]}
                style={{fontSize: '16px', height: '480px', fontFamily: 'Arial, sans-serif', border: 'none' }}
                placeholder="Nhập nội dung..."
            />
        </div>
    )
}
export default LibQillComponent