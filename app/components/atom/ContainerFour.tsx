"use client";

import React, { ReactNode } from "react";

interface IContentLayout {
    contents: ReactNode[];
}

export default function ContainerFour({ contents }: IContentLayout) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {contents.map((content, idx) => (
                <div key={idx} className="flex flex-col gap-4">
                    {content}
                </div>
            ))}
        </div>
    );
}
