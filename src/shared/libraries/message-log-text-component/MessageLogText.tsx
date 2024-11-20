import './MessageLogText.scss'
interface MessageProps {
    text?: string|any
    type?: string
}
const BaseMessageLog: React.FC<MessageProps> = ({text}) => {

    return ( 
        <div className="mess-invalid mt-1">{text}</div>
     );
}

export default BaseMessageLog;