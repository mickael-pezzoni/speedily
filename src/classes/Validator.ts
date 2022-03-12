import { validate } from 'class-validator';
import { ClassValidator } from 'types';
import { BadRequestError } from './HttpError';

/**
 *
 *
 * @export
 * @class Validator
 */
export class Validator {
    private readonly classValidator: ClassValidator | undefined;

    /**
     * Creates an instance of Validator.
     * @param {ClassValidator} [classValidator]
     * @memberof Validator
     */
    constructor(classValidator?: ClassValidator) {
        this.classValidator = classValidator;
    }
    /**
     *
     *
     * @param {Record<string, unknown>} objectToValidate
     * @return {*}  {Promise<boolean>}
     * @memberof Validator
     */
    async validate(
        objectToValidate: Record<string, unknown>
    ): Promise<boolean> {
        if (this.classValidator !== undefined) {
            const instance = new this.classValidator();
            Object.entries(objectToValidate).forEach(([key, value]) => {
                Object.defineProperty(instance, key, {
                    value,
                    writable: true,
                });
            });

            const validationErrors = await validate(instance);

            if (validationErrors.length > 0) {
                throw new BadRequestError(
                    validationErrors.map((v) => v.toString()).join()
                );
            }
        }
        return true;
    }
}
