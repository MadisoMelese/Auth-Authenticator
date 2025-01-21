
const Input = ({icon:Icon, ...props}) => {
  return (
    <div className="relative mb-6">
      <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-green-500" />
      </div>

      <input {...props} className="w-full pl-10 pr-3 py-2 border border-gray-800 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 duration-200" />
    </div>
  )
}

export default Input
