'use client'

import React from 'react';

export default function Login() {
  return (
    <div>
        <div className="flex flex-col items-center pt-20 pb-30 px-4">
            <div className="flex flex-col items-center mb-10">
                <img src={`${process.env.NEXT_PUBLIC_MINIO_URL}/logo.png`} alt="logo" width={200} height={60} className="object-contain"/>
            </div>

            <div className="w-full max-w-md rounded-xl border border-gray-300 p-8 shadow-sm">
                <form className="space-y-6">
                    <div>
                        <label htmlFor="ID" className="block text-sm font-medium text-gray-700">
                        ID
                        </label>
                        <input
                        id="ID"
                        name="ID"
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 focus:border-amber-500 focus:ring-amber-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                        </label>
                        <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 focus:border-amber-500 focus:ring-amber-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-amber-500 py-2 text-white font-semibold hover:bg-amber-600"
                    >
                        Sign In
                    </button>

                    <div className="flex justify-between text-sm mt-4">
                        <a href="#" className="text-amber-600 hover:underline">
                        Register
                        </a>
                        <a href="#" className="text-gray-600 hover:underline">
                        Forgot password?
                        </a>
                    </div>
                </form>
            </div>
        </div>
        <div className="w-full mt-10">
            <img src={`${process.env.NEXT_PUBLIC_MINIO_URL}/subfooter.png`} alt="subfooter" className="w-full" />
        </div>
    </div>
  );
}
