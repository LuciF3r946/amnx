// UI Component types
export interface ButtonVariant {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
    size?: 'sm' | 'md' | 'lg'
    loading?: boolean
    disabled?: boolean
}

export interface CardProps {
    className?: string
    children: React.ReactNode
    hover?: boolean
    padding?: 'none' | 'sm' | 'md' | 'lg'
}

export interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: React.ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl'
}

export interface ToastType {
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    title?: string
    message: string
    duration?: number
}

export interface Theme {
    mode: 'light' | 'dark' | 'system'
    primaryColor?: string
    accentColor?: string
}
