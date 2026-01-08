import {toast} from 'react-toastify'

const Failed = () => {
    toast.error("Transaction Failed!",{autoClose:1500})
    setTimeout(() => {
        window.location = '/cart'
    }, 2000);
  return (
    <div className='text-center min-h-[36vh] my-10.5'>
      Transaction Failed!
    </div>
  )
}

export default Failed
