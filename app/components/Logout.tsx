import * as React from "react";

function LogoutIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            {...props}
        >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M5 22a1 1 0 01-1-1V3a1 1 0 011-1h14a1 1 0 011 1v18a1 1 0 01-1 1H5zm10-6l5-4-5-4v3H9v2h6v3z" />
        </svg>
    );
}

export default LogoutIcon