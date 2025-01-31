export default function Button ({title, onClick}) {
    return <button 
        type="button" 
        className="bg-blue-600 font-semibold rounded-xl p-2 text-center place-self-center flex justify-center items-center  aria-label={title}" 
        onClick={onClick}
        >{title}
        </button> 
    
}