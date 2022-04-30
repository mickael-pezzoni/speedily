import { validate } from 'class-validator';

import { ClassValidator } from '../types/simple.type';
import { BadRequestError } from './HttpError';

/**
 *
 *
 * @export
 * @class Validator
 */
export class Validator {
    /**
     *
     *
     * @private
     * @type {(ClassValidator | undefined)}
     * @memberof Validator
     */
    private readonly ClassValidator: ClassValidator | undefined;

    /**
     * Creates an instance of Validator.
     * @param {ClassValidator} [classValidator]
     * @memberof Validator
     */
    constructor(classValidator?: ClassValidator) {
        this.ClassValidator = classValidator;
    }
    /**
     *
     *
     * @param {Record<PropertyKey, unknown>} objectToValidate
     * @return {*}  {Promise<boolean>}
     * @memberof Validator
     */
    async validate(
        objectToValidate: Record<PropertyKey, unknown>
    ): Promise<boolean> {
        if (this.ClassValidator !== undefined) {
            const instance = new this.ClassValidator();
            Object.entries(objectToValidate).forEach(([key, value]) => {
                Object.defineProperty(instance, key, {
                    value,
                    writable: true,
                });
            });

            const validationErrors = await validate(instance);

            if (validationErrors.length > 0) {
                throw new BadRequestError(
                    validationErrors.map((v) => v.toString()).join('\n')
                );
            }
        }
        return true;
    }
}
