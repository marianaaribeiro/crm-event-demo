"use client";

import React, { ReactNode } from "react";

interface IContentSideBySide {
    contentOne: ReactNode;
    contentTwo: ReactNode;
}

export default function ContentSideBySide({ contentOne, contentTwo }: IContentSideBySide) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col gap-6 flex-wrap">
                {contentOne ?? null}
            </div>
            <div className="flex flex-col gap-6 flex-wrap">
                {contentTwo ?? null}
            </div>
        </div>
    );
}
