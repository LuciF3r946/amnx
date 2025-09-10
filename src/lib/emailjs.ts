import emailjs from '@emailjs/browser'

// EmailJS configuration using environment variables
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!

// Initialize EmailJS (optional, but recommended)
export const initEmailJS = () => {
    if (typeof window !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY)
    }
}

// Email service function
export const sendEmail = async (formData: {
    name: string
    email: string
    subject: string
    message: string
}) => {
    try {
        // Debug: Log environment variables (without sensitive data)
        console.log('EmailJS Config Check:', {
            hasServiceId: !!EMAILJS_SERVICE_ID,
            hasTemplateId: !!EMAILJS_TEMPLATE_ID,
            hasPublicKey: !!EMAILJS_PUBLIC_KEY,
            serviceIdLength: EMAILJS_SERVICE_ID?.length,
            templateIdLength: EMAILJS_TEMPLATE_ID?.length,
            publicKeyLength: EMAILJS_PUBLIC_KEY?.length
        })

        // Validate required fields
        if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
            throw new Error('EmailJS configuration is missing. Please check your environment variables.')
        }

        // Debug: Log the actual service ID to help identify the issue
        console.log('Using Service ID:', EMAILJS_SERVICE_ID)
        console.log('Using Template ID:', EMAILJS_TEMPLATE_ID)
        console.log('Using Public Key (first 10 chars):', EMAILJS_PUBLIC_KEY.substring(0, 10) + '...')

        // Validate form data
        if (!formData.name || !formData.email || !formData.message) {
            throw new Error('Required form fields are missing.')
        }

        console.log('Sending email with data:', {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            messageLength: formData.message.length
        })

        // Template params matching your EmailJS template exactly
        const templateParams = {
            name: formData.name,           // Used in template: {{name}}
            email: formData.email,         // Used in template reply-to: {{email}}
            message: formData.message,     // Used in template: {{message}}
            time: new Date().toLocaleString() // Used in template: {{time}}
        }

        console.log('Template params being sent:', templateParams)

        const result = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams,
            EMAILJS_PUBLIC_KEY
        )

        console.log('EmailJS Success:', result)
        return result
    } catch (error) {
        console.error('EmailJS Error Details:', {
            error: error,
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        })
        throw error
    }
}

export default emailjs
