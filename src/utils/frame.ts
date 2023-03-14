import { ElMessageBox } from 'element-plus'

export const confirm = (message:string, title:string,options?:any,confirmText:string='确认',cancelText:string='取消') => {
  return ElMessageBox.confirm(message,title,
    {
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      type: 'warning',
      ...options
    }
  )
}

export const prompt = (message:string,title:string,options?:any,confirmText:string='确认',cancelText:string='取消') => {
  return ElMessageBox.prompt(message, title, {
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    ...options
  })
}