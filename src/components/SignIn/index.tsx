'use client'

import { SignInInputValidator, SignInValidator } from "@/lib/validators/signIn";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'


const SignIn = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<SignInInputValidator>({
        resolver: zodResolver(SignInValidator),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    async function signIn(data: SignInInputValidator) {
        console.log(data);
    }

    return ( 
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form 
                className="space-y-6"
                onSubmit={handleSubmit((data) => signIn(data))}
                >
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input {...register('email')} id="email" type="text" className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" />
                        </div>
                        { errors.email && (<p aria-label='error-email' className="text-sm text-red-600 my-1">{errors.email.message}</p>)}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div className="mt-2">
                            <input aria-label="password-input" {...register('password')} id="password" type="password" className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" />
                        </div>
                        { errors.password && (<p aria-label='error-password' className="text-sm text-red-600 my-1">{errors.password.message}</p>)}
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                    </div>                    
                </form>
            </div>
        </div>
    );
}

export default SignIn;