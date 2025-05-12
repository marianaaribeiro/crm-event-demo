"use client";

import React, { ReactNode } from "react";

interface IContentLayout {
    contentOne: ReactNode;
}

export default function ContentLayout({ contentOne }: IContentLayout) {
    return (
        <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 flex flex-col gap-6 flex-wrap">
                {contentOne ?? null}
            </div>
        </div>
    );
}
