export default function Container({ children, className = '' }) {
  return (
    <div className="w-full px-6 md:px-10">
      <div className={`mx-auto max-w-7xl ${className}`}>{children}</div>
    </div>
  )
}
