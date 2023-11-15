import 'dotenv/config'
import tracer from 'dd-trace'

const DD_ENV = process.env.DD_ENV || 'dev'
if (DD_ENV === 'prod') tracer.init()

export default tracer