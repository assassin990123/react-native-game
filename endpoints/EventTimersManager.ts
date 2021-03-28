type Callback = () => void;

export default class EventTimersManager {
    static clearTimer?: NodeJS.Timeout = undefined;
    static sleepTimer?: NodeJS.Timeout = undefined;
    static moodTimer?: NodeJS.Timeout = undefined;
    static eatTimer?: NodeJS.Timeout = undefined;

    // @ts-ignore
    static initTimers(clearCallback: Callback, sleepCallback: Callback, moodCallback: Callback, eatCallback: Callback) {
        if (EventTimersManager.clearTimer == undefined && EventTimersManager.sleepTimer == undefined && EventTimersManager.moodTimer == undefined && EventTimersManager.eatTimer == undefined) {
            console.log("[EventTimersManager] -> CREATE HERO PROPS TIMERS !!!");

            EventTimersManager.clearTimer = setInterval(() => {
                clearCallback();
                console.log("CLEAR TIMER!")
            }, 5 * 60 * 1000);

            EventTimersManager.sleepTimer = setInterval(() => {
                sleepCallback();
                console.log("SLEEP TIMER!")
            }, 6 * 60 * 1000);

            EventTimersManager.moodTimer = setInterval(() => {
                moodCallback();
                console.log("MOOD TIMER!")
            }, 2 * 60 * 1000);

            EventTimersManager.eatTimer = setInterval(() => {
                eatCallback();
                console.log("EAT TIMER!")
            }, 3 * 60 * 1000);
        }
    }
}
