
const Location = ({src}) => {
  return (
    <div>
      <iframe
          src={src}
          className="w-full h-[450px] rounded-md"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Store Location"
        ></iframe>
    </div>
  )
}

export default Location
