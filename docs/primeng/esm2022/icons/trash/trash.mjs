import { Component } from '@angular/core';
import { BaseIcon } from 'primeng/baseicon';
import { UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
export class TrashIcon extends BaseIcon {
    pathId;
    ngOnInit() {
        this.pathId = 'url(#' + UniqueComponentId() + ')';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: TrashIcon, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: TrashIcon, isStandalone: true, selector: "TrashIcon", usesInheritance: true, ngImport: i0, template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g [attr.clip-path]="pathId">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.44802 13.9955H10.552C10.8056 14.0129 11.06 13.9797 11.3006 13.898C11.5412 13.8163 11.7632 13.6877 11.9537 13.5196C12.1442 13.3515 12.2995 13.1473 12.4104 12.9188C12.5213 12.6903 12.5858 12.442 12.6 12.1884V4.36041H13.4C13.5591 4.36041 13.7117 4.29722 13.8243 4.18476C13.9368 4.07229 14 3.91976 14 3.76071C14 3.60166 13.9368 3.44912 13.8243 3.33666C13.7117 3.22419 13.5591 3.16101 13.4 3.16101H12.0537C12.0203 3.1557 11.9863 3.15299 11.952 3.15299C11.9178 3.15299 11.8838 3.1557 11.8503 3.16101H11.2285C11.2421 3.10893 11.2487 3.05513 11.248 3.00106V1.80966C11.2171 1.30262 10.9871 0.828306 10.608 0.48989C10.229 0.151475 9.73159 -0.0236625 9.22402 0.00257442H4.77602C4.27251 -0.0171866 3.78126 0.160868 3.40746 0.498617C3.03365 0.836366 2.807 1.30697 2.77602 1.80966V3.00106C2.77602 3.0556 2.78346 3.10936 2.79776 3.16101H0.6C0.521207 3.16101 0.443185 3.17652 0.37039 3.20666C0.297595 3.2368 0.231451 3.28097 0.175736 3.33666C0.120021 3.39235 0.0758251 3.45846 0.0456722 3.53121C0.0155194 3.60397 0 3.68196 0 3.76071C0 3.83946 0.0155194 3.91744 0.0456722 3.9902C0.0758251 4.06296 0.120021 4.12907 0.175736 4.18476C0.231451 4.24045 0.297595 4.28462 0.37039 4.31476C0.443185 4.3449 0.521207 4.36041 0.6 4.36041H1.40002V12.1884C1.41426 12.442 1.47871 12.6903 1.58965 12.9188C1.7006 13.1473 1.85582 13.3515 2.04633 13.5196C2.23683 13.6877 2.45882 13.8163 2.69944 13.898C2.94005 13.9797 3.1945 14.0129 3.44802 13.9955ZM2.60002 4.36041H11.304V12.1884C11.304 12.5163 10.952 12.7961 10.504 12.7961H3.40002C2.97602 12.7961 2.60002 12.5163 2.60002 12.1884V4.36041ZM3.95429 3.16101C3.96859 3.10936 3.97602 3.0556 3.97602 3.00106V1.80966C3.97602 1.48183 4.33602 1.20197 4.77602 1.20197H9.24802C9.66403 1.20197 10.048 1.48183 10.048 1.80966V3.00106C10.0473 3.05515 10.054 3.10896 10.0678 3.16101H3.95429ZM5.57571 10.997C5.41731 10.995 5.26597 10.9311 5.15395 10.8191C5.04193 10.7071 4.97808 10.5558 4.97601 10.3973V6.77517C4.97601 6.61612 5.0392 6.46359 5.15166 6.35112C5.26413 6.23866 5.41666 6.17548 5.57571 6.17548C5.73476 6.17548 5.8873 6.23866 5.99976 6.35112C6.11223 6.46359 6.17541 6.61612 6.17541 6.77517V10.3894C6.17647 10.4688 6.16174 10.5476 6.13208 10.6213C6.10241 10.695 6.05841 10.762 6.00261 10.8186C5.94682 10.8751 5.88035 10.92 5.80707 10.9506C5.73378 10.9813 5.65514 10.9971 5.57571 10.997ZM7.99968 10.8214C8.11215 10.9339 8.26468 10.997 8.42373 10.997C8.58351 10.9949 8.73604 10.93 8.84828 10.8163C8.96052 10.7025 9.02345 10.5491 9.02343 10.3894V6.77517C9.02343 6.61612 8.96025 6.46359 8.84778 6.35112C8.73532 6.23866 8.58278 6.17548 8.42373 6.17548C8.26468 6.17548 8.11215 6.23866 7.99968 6.35112C7.88722 6.46359 7.82404 6.61612 7.82404 6.77517V10.3973C7.82404 10.5564 7.88722 10.7089 7.99968 10.8214Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath [id]="pathId">
                    <rect width="14" height="14" fill="white" />
                </clipPath>
            </defs>
        </svg>
    `, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: TrashIcon, decorators: [{
            type: Component,
            args: [{
                    selector: 'TrashIcon',
                    standalone: true,
                    imports: [BaseIcon],
                    template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g [attr.clip-path]="pathId">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.44802 13.9955H10.552C10.8056 14.0129 11.06 13.9797 11.3006 13.898C11.5412 13.8163 11.7632 13.6877 11.9537 13.5196C12.1442 13.3515 12.2995 13.1473 12.4104 12.9188C12.5213 12.6903 12.5858 12.442 12.6 12.1884V4.36041H13.4C13.5591 4.36041 13.7117 4.29722 13.8243 4.18476C13.9368 4.07229 14 3.91976 14 3.76071C14 3.60166 13.9368 3.44912 13.8243 3.33666C13.7117 3.22419 13.5591 3.16101 13.4 3.16101H12.0537C12.0203 3.1557 11.9863 3.15299 11.952 3.15299C11.9178 3.15299 11.8838 3.1557 11.8503 3.16101H11.2285C11.2421 3.10893 11.2487 3.05513 11.248 3.00106V1.80966C11.2171 1.30262 10.9871 0.828306 10.608 0.48989C10.229 0.151475 9.73159 -0.0236625 9.22402 0.00257442H4.77602C4.27251 -0.0171866 3.78126 0.160868 3.40746 0.498617C3.03365 0.836366 2.807 1.30697 2.77602 1.80966V3.00106C2.77602 3.0556 2.78346 3.10936 2.79776 3.16101H0.6C0.521207 3.16101 0.443185 3.17652 0.37039 3.20666C0.297595 3.2368 0.231451 3.28097 0.175736 3.33666C0.120021 3.39235 0.0758251 3.45846 0.0456722 3.53121C0.0155194 3.60397 0 3.68196 0 3.76071C0 3.83946 0.0155194 3.91744 0.0456722 3.9902C0.0758251 4.06296 0.120021 4.12907 0.175736 4.18476C0.231451 4.24045 0.297595 4.28462 0.37039 4.31476C0.443185 4.3449 0.521207 4.36041 0.6 4.36041H1.40002V12.1884C1.41426 12.442 1.47871 12.6903 1.58965 12.9188C1.7006 13.1473 1.85582 13.3515 2.04633 13.5196C2.23683 13.6877 2.45882 13.8163 2.69944 13.898C2.94005 13.9797 3.1945 14.0129 3.44802 13.9955ZM2.60002 4.36041H11.304V12.1884C11.304 12.5163 10.952 12.7961 10.504 12.7961H3.40002C2.97602 12.7961 2.60002 12.5163 2.60002 12.1884V4.36041ZM3.95429 3.16101C3.96859 3.10936 3.97602 3.0556 3.97602 3.00106V1.80966C3.97602 1.48183 4.33602 1.20197 4.77602 1.20197H9.24802C9.66403 1.20197 10.048 1.48183 10.048 1.80966V3.00106C10.0473 3.05515 10.054 3.10896 10.0678 3.16101H3.95429ZM5.57571 10.997C5.41731 10.995 5.26597 10.9311 5.15395 10.8191C5.04193 10.7071 4.97808 10.5558 4.97601 10.3973V6.77517C4.97601 6.61612 5.0392 6.46359 5.15166 6.35112C5.26413 6.23866 5.41666 6.17548 5.57571 6.17548C5.73476 6.17548 5.8873 6.23866 5.99976 6.35112C6.11223 6.46359 6.17541 6.61612 6.17541 6.77517V10.3894C6.17647 10.4688 6.16174 10.5476 6.13208 10.6213C6.10241 10.695 6.05841 10.762 6.00261 10.8186C5.94682 10.8751 5.88035 10.92 5.80707 10.9506C5.73378 10.9813 5.65514 10.9971 5.57571 10.997ZM7.99968 10.8214C8.11215 10.9339 8.26468 10.997 8.42373 10.997C8.58351 10.9949 8.73604 10.93 8.84828 10.8163C8.96052 10.7025 9.02345 10.5491 9.02343 10.3894V6.77517C9.02343 6.61612 8.96025 6.46359 8.84778 6.35112C8.73532 6.23866 8.58278 6.17548 8.42373 6.17548C8.26468 6.17548 8.11215 6.23866 7.99968 6.35112C7.88722 6.46359 7.82404 6.61612 7.82404 6.77517V10.3973C7.82404 10.5564 7.88722 10.7089 7.99968 10.8214Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath [id]="pathId">
                    <rect width="14" height="14" fill="white" />
                </clipPath>
            </defs>
        </svg>
    `
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhc2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvaWNvbnMvdHJhc2gvdHJhc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOztBQXdCbEQsTUFBTSxPQUFPLFNBQVUsU0FBUSxRQUFRO0lBQ25DLE1BQU0sQ0FBUztJQUVmLFFBQVE7UUFDSixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sR0FBRyxpQkFBaUIsRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUN0RCxDQUFDO3VHQUxRLFNBQVM7MkZBQVQsU0FBUyw0RkFsQlI7Ozs7Ozs7Ozs7Ozs7Ozs7S0FnQlQ7OzJGQUVRLFNBQVM7a0JBdEJyQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxXQUFXO29CQUNyQixVQUFVLEVBQUUsSUFBSTtvQkFDaEIsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO29CQUNuQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7S0FnQlQ7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VJY29uIH0gZnJvbSAncHJpbWVuZy9iYXNlaWNvbic7XG5pbXBvcnQgeyBVbmlxdWVDb21wb25lbnRJZCB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1RyYXNoSWNvbicsXG4gICAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgICBpbXBvcnRzOiBbQmFzZUljb25dLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzdmcgd2lkdGg9XCIxNFwiIGhlaWdodD1cIjE0XCIgdmlld0JveD1cIjAgMCAxNCAxNFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwiYXJpYUhpZGRlblwiIFthdHRyLnJvbGVdPVwicm9sZVwiIFtjbGFzc109XCJnZXRDbGFzc05hbWVzKClcIj5cbiAgICAgICAgICAgIDxnIFthdHRyLmNsaXAtcGF0aF09XCJwYXRoSWRcIj5cbiAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgICBmaWxsLXJ1bGU9XCJldmVub2RkXCJcbiAgICAgICAgICAgICAgICAgICAgY2xpcC1ydWxlPVwiZXZlbm9kZFwiXG4gICAgICAgICAgICAgICAgICAgIGQ9XCJNMy40NDgwMiAxMy45OTU1SDEwLjU1MkMxMC44MDU2IDE0LjAxMjkgMTEuMDYgMTMuOTc5NyAxMS4zMDA2IDEzLjg5OEMxMS41NDEyIDEzLjgxNjMgMTEuNzYzMiAxMy42ODc3IDExLjk1MzcgMTMuNTE5NkMxMi4xNDQyIDEzLjM1MTUgMTIuMjk5NSAxMy4xNDczIDEyLjQxMDQgMTIuOTE4OEMxMi41MjEzIDEyLjY5MDMgMTIuNTg1OCAxMi40NDIgMTIuNiAxMi4xODg0VjQuMzYwNDFIMTMuNEMxMy41NTkxIDQuMzYwNDEgMTMuNzExNyA0LjI5NzIyIDEzLjgyNDMgNC4xODQ3NkMxMy45MzY4IDQuMDcyMjkgMTQgMy45MTk3NiAxNCAzLjc2MDcxQzE0IDMuNjAxNjYgMTMuOTM2OCAzLjQ0OTEyIDEzLjgyNDMgMy4zMzY2NkMxMy43MTE3IDMuMjI0MTkgMTMuNTU5MSAzLjE2MTAxIDEzLjQgMy4xNjEwMUgxMi4wNTM3QzEyLjAyMDMgMy4xNTU3IDExLjk4NjMgMy4xNTI5OSAxMS45NTIgMy4xNTI5OUMxMS45MTc4IDMuMTUyOTkgMTEuODgzOCAzLjE1NTcgMTEuODUwMyAzLjE2MTAxSDExLjIyODVDMTEuMjQyMSAzLjEwODkzIDExLjI0ODcgMy4wNTUxMyAxMS4yNDggMy4wMDEwNlYxLjgwOTY2QzExLjIxNzEgMS4zMDI2MiAxMC45ODcxIDAuODI4MzA2IDEwLjYwOCAwLjQ4OTg5QzEwLjIyOSAwLjE1MTQ3NSA5LjczMTU5IC0wLjAyMzY2MjUgOS4yMjQwMiAwLjAwMjU3NDQySDQuNzc2MDJDNC4yNzI1MSAtMC4wMTcxODY2IDMuNzgxMjYgMC4xNjA4NjggMy40MDc0NiAwLjQ5ODYxN0MzLjAzMzY1IDAuODM2MzY2IDIuODA3IDEuMzA2OTcgMi43NzYwMiAxLjgwOTY2VjMuMDAxMDZDMi43NzYwMiAzLjA1NTYgMi43ODM0NiAzLjEwOTM2IDIuNzk3NzYgMy4xNjEwMUgwLjZDMC41MjEyMDcgMy4xNjEwMSAwLjQ0MzE4NSAzLjE3NjUyIDAuMzcwMzkgMy4yMDY2NkMwLjI5NzU5NSAzLjIzNjggMC4yMzE0NTEgMy4yODA5NyAwLjE3NTczNiAzLjMzNjY2QzAuMTIwMDIxIDMuMzkyMzUgMC4wNzU4MjUxIDMuNDU4NDYgMC4wNDU2NzIyIDMuNTMxMjFDMC4wMTU1MTk0IDMuNjAzOTcgMCAzLjY4MTk2IDAgMy43NjA3MUMwIDMuODM5NDYgMC4wMTU1MTk0IDMuOTE3NDQgMC4wNDU2NzIyIDMuOTkwMkMwLjA3NTgyNTEgNC4wNjI5NiAwLjEyMDAyMSA0LjEyOTA3IDAuMTc1NzM2IDQuMTg0NzZDMC4yMzE0NTEgNC4yNDA0NSAwLjI5NzU5NSA0LjI4NDYyIDAuMzcwMzkgNC4zMTQ3NkMwLjQ0MzE4NSA0LjM0NDkgMC41MjEyMDcgNC4zNjA0MSAwLjYgNC4zNjA0MUgxLjQwMDAyVjEyLjE4ODRDMS40MTQyNiAxMi40NDIgMS40Nzg3MSAxMi42OTAzIDEuNTg5NjUgMTIuOTE4OEMxLjcwMDYgMTMuMTQ3MyAxLjg1NTgyIDEzLjM1MTUgMi4wNDYzMyAxMy41MTk2QzIuMjM2ODMgMTMuNjg3NyAyLjQ1ODgyIDEzLjgxNjMgMi42OTk0NCAxMy44OThDMi45NDAwNSAxMy45Nzk3IDMuMTk0NSAxNC4wMTI5IDMuNDQ4MDIgMTMuOTk1NVpNMi42MDAwMiA0LjM2MDQxSDExLjMwNFYxMi4xODg0QzExLjMwNCAxMi41MTYzIDEwLjk1MiAxMi43OTYxIDEwLjUwNCAxMi43OTYxSDMuNDAwMDJDMi45NzYwMiAxMi43OTYxIDIuNjAwMDIgMTIuNTE2MyAyLjYwMDAyIDEyLjE4ODRWNC4zNjA0MVpNMy45NTQyOSAzLjE2MTAxQzMuOTY4NTkgMy4xMDkzNiAzLjk3NjAyIDMuMDU1NiAzLjk3NjAyIDMuMDAxMDZWMS44MDk2NkMzLjk3NjAyIDEuNDgxODMgNC4zMzYwMiAxLjIwMTk3IDQuNzc2MDIgMS4yMDE5N0g5LjI0ODAyQzkuNjY0MDMgMS4yMDE5NyAxMC4wNDggMS40ODE4MyAxMC4wNDggMS44MDk2NlYzLjAwMTA2QzEwLjA0NzMgMy4wNTUxNSAxMC4wNTQgMy4xMDg5NiAxMC4wNjc4IDMuMTYxMDFIMy45NTQyOVpNNS41NzU3MSAxMC45OTdDNS40MTczMSAxMC45OTUgNS4yNjU5NyAxMC45MzExIDUuMTUzOTUgMTAuODE5MUM1LjA0MTkzIDEwLjcwNzEgNC45NzgwOCAxMC41NTU4IDQuOTc2MDEgMTAuMzk3M1Y2Ljc3NTE3QzQuOTc2MDEgNi42MTYxMiA1LjAzOTIgNi40NjM1OSA1LjE1MTY2IDYuMzUxMTJDNS4yNjQxMyA2LjIzODY2IDUuNDE2NjYgNi4xNzU0OCA1LjU3NTcxIDYuMTc1NDhDNS43MzQ3NiA2LjE3NTQ4IDUuODg3MyA2LjIzODY2IDUuOTk5NzYgNi4zNTExMkM2LjExMjIzIDYuNDYzNTkgNi4xNzU0MSA2LjYxNjEyIDYuMTc1NDEgNi43NzUxN1YxMC4zODk0QzYuMTc2NDcgMTAuNDY4OCA2LjE2MTc0IDEwLjU0NzYgNi4xMzIwOCAxMC42MjEzQzYuMTAyNDEgMTAuNjk1IDYuMDU4NDEgMTAuNzYyIDYuMDAyNjEgMTAuODE4NkM1Ljk0NjgyIDEwLjg3NTEgNS44ODAzNSAxMC45MiA1LjgwNzA3IDEwLjk1MDZDNS43MzM3OCAxMC45ODEzIDUuNjU1MTQgMTAuOTk3MSA1LjU3NTcxIDEwLjk5N1pNNy45OTk2OCAxMC44MjE0QzguMTEyMTUgMTAuOTMzOSA4LjI2NDY4IDEwLjk5NyA4LjQyMzczIDEwLjk5N0M4LjU4MzUxIDEwLjk5NDkgOC43MzYwNCAxMC45MyA4Ljg0ODI4IDEwLjgxNjNDOC45NjA1MiAxMC43MDI1IDkuMDIzNDUgMTAuNTQ5MSA5LjAyMzQzIDEwLjM4OTRWNi43NzUxN0M5LjAyMzQzIDYuNjE2MTIgOC45NjAyNSA2LjQ2MzU5IDguODQ3NzggNi4zNTExMkM4LjczNTMyIDYuMjM4NjYgOC41ODI3OCA2LjE3NTQ4IDguNDIzNzMgNi4xNzU0OEM4LjI2NDY4IDYuMTc1NDggOC4xMTIxNSA2LjIzODY2IDcuOTk5NjggNi4zNTExMkM3Ljg4NzIyIDYuNDYzNTkgNy44MjQwNCA2LjYxNjEyIDcuODI0MDQgNi43NzUxN1YxMC4zOTczQzcuODI0MDQgMTAuNTU2NCA3Ljg4NzIyIDEwLjcwODkgNy45OTk2OCAxMC44MjE0WlwiXG4gICAgICAgICAgICAgICAgICAgIGZpbGw9XCJjdXJyZW50Q29sb3JcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8ZGVmcz5cbiAgICAgICAgICAgICAgICA8Y2xpcFBhdGggW2lkXT1cInBhdGhJZFwiPlxuICAgICAgICAgICAgICAgICAgICA8cmVjdCB3aWR0aD1cIjE0XCIgaGVpZ2h0PVwiMTRcIiBmaWxsPVwid2hpdGVcIiAvPlxuICAgICAgICAgICAgICAgIDwvY2xpcFBhdGg+XG4gICAgICAgICAgICA8L2RlZnM+XG4gICAgICAgIDwvc3ZnPlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgVHJhc2hJY29uIGV4dGVuZHMgQmFzZUljb24ge1xuICAgIHBhdGhJZDogc3RyaW5nO1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucGF0aElkID0gJ3VybCgjJyArIFVuaXF1ZUNvbXBvbmVudElkKCkgKyAnKSc7XG4gICAgfVxufVxuIl19