// Navigation types
export interface NavItem {
    id: string
    label: string
    href: string
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
    external?: boolean
    children?: NavItem[]
}

export interface Breadcrumb {
    label: string
    href?: string
    current?: boolean
}

export interface SocialLink {
    platform: string
    url: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    label: string
}
