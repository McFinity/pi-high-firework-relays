import { now, loop } from './util'

const LOOP_DELAY_MILLIS = 50
const BURN_TIME_MILLIS = 2000
const PIN_ON = 0
const PIN_OFF = 1

export class Detonator {
    constructor ({ Gpio, stagePinNumbersAndDeltas = [] }) {
        this.stagePinsAndDeltas = stagePinNumbersAndDeltas.map(pinNumberAndDelta => {
            const pin = new Gpio(pinNumberAndDelta.pinNumber, { mode: Gpio.OUTPUT })
            pin.digitalWrite(PIN_OFF)
            return {
                pin,
                deltaMillis: pinNumberAndDelta.deltaMillis
            }
        })
    }

    detonate () {
        const programStartMillis = now()
        this.isExecuting = true
        let deltaSum = 0;
        this.stages = stagePinsAndDeltas.map(pinAndDelta => {
            deltaSum += pinAndDelta.deltaMillis
            const startTimeMillis = programStartMillis + deltaSum
            return {
                ...pinAndDelta,
                startTimeMillis,
                endTimeMillis: startTimeMillis + BURN_TIME_MILLIS
            }
        })

        loop(() => {
            const now = now()
            this.stages.forEach(stage => {
                const isStageActive = stage.startTimeMillis < now && now < stage.endTimeMillis
                stage.pin.digitalWrite(isStageActive ? PIN_ON : PIN_OFF)
            })
        }, LOOP_DELAY_MILLIS, this.isExecuting)
    }

    stop () {
        this.isExecuting = false
    }
}