export default function InputBox ({title, placeholder, onChange, type}) {
    return <div>
        <div>
            {title}: 
        </div>
        <div>
            <input type={type} onChange={onChange} placeholder={placeholder} className="placeholder-shown:border-gray-500 required:border-red-500 min-w-sm border-solid"/>
            <br></br><br></br>
        </div>
    </div>
}