import traverson from "traverson-promise"
import JsonHalAdapter from "traverson-hal"

traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter)
const BASE_PATH = "/"

export default class AlpsTraverson {
    constructor() {
        this.url = BASE_PATH
        this.profile = undefined
    }

    withUrl(url) {
        this.url = url
        return this
    }

    forResource(resource) {
        const instance = this
        return new Promise((resolve, reject) => {
            traverson
                .from(this.url)
                .jsonHal()
                .follow("profile", resource)
                .getResource().result
                .then(profile => {
                    this.profile = profile
                    let wrapResult = {
                        profile: profile,
                        continue: function () {
                            return instance;
                        }
                    }
                    resolve(wrapResult)
                })
                .catch(() => reject(new Error("Cannot find profile for " + resource)))
        })
    }

    getProperty(name) {
        return new Promise((resolve, reject) => {
            if (this.profile === undefined) {
                reject(new Error("Cannot find property of undefined. Profile is missing."));
            } else {
                const descriptorArray = this.profile.alps.descriptor;
                const found = descriptorArray
                    .find(el => el.id.includes("representation"))
                    .descriptor
                    .find(property => property.name === name);
                resolve(found)
            }
        })
    }

}