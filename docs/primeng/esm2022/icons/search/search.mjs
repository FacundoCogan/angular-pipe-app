import { Component } from '@angular/core';
import { BaseIcon } from 'primeng/baseicon';
import { UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
export class SearchIcon extends BaseIcon {
    pathId;
    ngOnInit() {
        this.pathId = 'url(#' + UniqueComponentId() + ')';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: SearchIcon, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: SearchIcon, isStandalone: true, selector: "SearchIcon", usesInheritance: true, ngImport: i0, template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g [attr.clip-path]="pathId">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.67602 11.0265C3.6661 11.688 4.83011 12.0411 6.02086 12.0411C6.81149 12.0411 7.59438 11.8854 8.32483 11.5828C8.87005 11.357 9.37808 11.0526 9.83317 10.6803L12.9769 13.8241C13.0323 13.8801 13.0983 13.9245 13.171 13.9548C13.2438 13.985 13.3219 14.0003 13.4007 14C13.4795 14.0003 13.5575 13.985 13.6303 13.9548C13.7031 13.9245 13.7691 13.8801 13.8244 13.8241C13.9367 13.7116 13.9998 13.5592 13.9998 13.4003C13.9998 13.2414 13.9367 13.089 13.8244 12.9765L10.6807 9.8328C11.053 9.37773 11.3573 8.86972 11.5831 8.32452C11.8857 7.59408 12.0414 6.81119 12.0414 6.02056C12.0414 4.8298 11.6883 3.66579 11.0268 2.67572C10.3652 1.68564 9.42494 0.913972 8.32483 0.45829C7.22472 0.00260857 6.01418 -0.116618 4.84631 0.115686C3.67844 0.34799 2.60568 0.921393 1.76369 1.76338C0.921698 2.60537 0.348296 3.67813 0.115991 4.84601C-0.116313 6.01388 0.00291375 7.22441 0.458595 8.32452C0.914277 9.42464 1.68595 10.3649 2.67602 11.0265ZM3.35565 2.0158C4.14456 1.48867 5.07206 1.20731 6.02086 1.20731C7.29317 1.20731 8.51338 1.71274 9.41304 2.6124C10.3127 3.51206 10.8181 4.73226 10.8181 6.00457C10.8181 6.95337 10.5368 7.88088 10.0096 8.66978C9.48251 9.45868 8.73328 10.0736 7.85669 10.4367C6.98011 10.7997 6.01554 10.8947 5.08496 10.7096C4.15439 10.5245 3.2996 10.0676 2.62869 9.39674C1.95778 8.72583 1.50089 7.87104 1.31579 6.94046C1.13068 6.00989 1.22568 5.04532 1.58878 4.16874C1.95187 3.29215 2.56675 2.54292 3.35565 2.0158Z"
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: SearchIcon, decorators: [{
            type: Component,
            args: [{
                    selector: 'SearchIcon',
                    standalone: true,
                    imports: [BaseIcon],
                    template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g [attr.clip-path]="pathId">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.67602 11.0265C3.6661 11.688 4.83011 12.0411 6.02086 12.0411C6.81149 12.0411 7.59438 11.8854 8.32483 11.5828C8.87005 11.357 9.37808 11.0526 9.83317 10.6803L12.9769 13.8241C13.0323 13.8801 13.0983 13.9245 13.171 13.9548C13.2438 13.985 13.3219 14.0003 13.4007 14C13.4795 14.0003 13.5575 13.985 13.6303 13.9548C13.7031 13.9245 13.7691 13.8801 13.8244 13.8241C13.9367 13.7116 13.9998 13.5592 13.9998 13.4003C13.9998 13.2414 13.9367 13.089 13.8244 12.9765L10.6807 9.8328C11.053 9.37773 11.3573 8.86972 11.5831 8.32452C11.8857 7.59408 12.0414 6.81119 12.0414 6.02056C12.0414 4.8298 11.6883 3.66579 11.0268 2.67572C10.3652 1.68564 9.42494 0.913972 8.32483 0.45829C7.22472 0.00260857 6.01418 -0.116618 4.84631 0.115686C3.67844 0.34799 2.60568 0.921393 1.76369 1.76338C0.921698 2.60537 0.348296 3.67813 0.115991 4.84601C-0.116313 6.01388 0.00291375 7.22441 0.458595 8.32452C0.914277 9.42464 1.68595 10.3649 2.67602 11.0265ZM3.35565 2.0158C4.14456 1.48867 5.07206 1.20731 6.02086 1.20731C7.29317 1.20731 8.51338 1.71274 9.41304 2.6124C10.3127 3.51206 10.8181 4.73226 10.8181 6.00457C10.8181 6.95337 10.5368 7.88088 10.0096 8.66978C9.48251 9.45868 8.73328 10.0736 7.85669 10.4367C6.98011 10.7997 6.01554 10.8947 5.08496 10.7096C4.15439 10.5245 3.2996 10.0676 2.62869 9.39674C1.95778 8.72583 1.50089 7.87104 1.31579 6.94046C1.13068 6.00989 1.22568 5.04532 1.58878 4.16874C1.95187 3.29215 2.56675 2.54292 3.35565 2.0158Z"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2ljb25zL3NlYXJjaC9zZWFyY2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOztBQXdCbEQsTUFBTSxPQUFPLFVBQVcsU0FBUSxRQUFRO0lBQ3BDLE1BQU0sQ0FBUztJQUVmLFFBQVE7UUFDSixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sR0FBRyxpQkFBaUIsRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUN0RCxDQUFDO3VHQUxRLFVBQVU7MkZBQVYsVUFBVSw2RkFsQlQ7Ozs7Ozs7Ozs7Ozs7Ozs7S0FnQlQ7OzJGQUVRLFVBQVU7a0JBdEJ0QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxZQUFZO29CQUN0QixVQUFVLEVBQUUsSUFBSTtvQkFDaEIsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO29CQUNuQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7S0FnQlQ7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VJY29uIH0gZnJvbSAncHJpbWVuZy9iYXNlaWNvbic7XG5pbXBvcnQgeyBVbmlxdWVDb21wb25lbnRJZCB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1NlYXJjaEljb24nLFxuICAgIHN0YW5kYWxvbmU6IHRydWUsXG4gICAgaW1wb3J0czogW0Jhc2VJY29uXSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8c3ZnIHdpZHRoPVwiMTRcIiBoZWlnaHQ9XCIxNFwiIHZpZXdCb3g9XCIwIDAgMTQgMTRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiIFthdHRyLmFyaWEtaGlkZGVuXT1cImFyaWFIaWRkZW5cIiBbYXR0ci5yb2xlXT1cInJvbGVcIiBbY2xhc3NdPVwiZ2V0Q2xhc3NOYW1lcygpXCI+XG4gICAgICAgICAgICA8ZyBbYXR0ci5jbGlwLXBhdGhdPVwicGF0aElkXCI+XG4gICAgICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgICAgICAgZmlsbC1ydWxlPVwiZXZlbm9kZFwiXG4gICAgICAgICAgICAgICAgICAgIGNsaXAtcnVsZT1cImV2ZW5vZGRcIlxuICAgICAgICAgICAgICAgICAgICBkPVwiTTIuNjc2MDIgMTEuMDI2NUMzLjY2NjEgMTEuNjg4IDQuODMwMTEgMTIuMDQxMSA2LjAyMDg2IDEyLjA0MTFDNi44MTE0OSAxMi4wNDExIDcuNTk0MzggMTEuODg1NCA4LjMyNDgzIDExLjU4MjhDOC44NzAwNSAxMS4zNTcgOS4zNzgwOCAxMS4wNTI2IDkuODMzMTcgMTAuNjgwM0wxMi45NzY5IDEzLjgyNDFDMTMuMDMyMyAxMy44ODAxIDEzLjA5ODMgMTMuOTI0NSAxMy4xNzEgMTMuOTU0OEMxMy4yNDM4IDEzLjk4NSAxMy4zMjE5IDE0LjAwMDMgMTMuNDAwNyAxNEMxMy40Nzk1IDE0LjAwMDMgMTMuNTU3NSAxMy45ODUgMTMuNjMwMyAxMy45NTQ4QzEzLjcwMzEgMTMuOTI0NSAxMy43NjkxIDEzLjg4MDEgMTMuODI0NCAxMy44MjQxQzEzLjkzNjcgMTMuNzExNiAxMy45OTk4IDEzLjU1OTIgMTMuOTk5OCAxMy40MDAzQzEzLjk5OTggMTMuMjQxNCAxMy45MzY3IDEzLjA4OSAxMy44MjQ0IDEyLjk3NjVMMTAuNjgwNyA5LjgzMjhDMTEuMDUzIDkuMzc3NzMgMTEuMzU3MyA4Ljg2OTcyIDExLjU4MzEgOC4zMjQ1MkMxMS44ODU3IDcuNTk0MDggMTIuMDQxNCA2LjgxMTE5IDEyLjA0MTQgNi4wMjA1NkMxMi4wNDE0IDQuODI5OCAxMS42ODgzIDMuNjY1NzkgMTEuMDI2OCAyLjY3NTcyQzEwLjM2NTIgMS42ODU2NCA5LjQyNDk0IDAuOTEzOTcyIDguMzI0ODMgMC40NTgyOUM3LjIyNDcyIDAuMDAyNjA4NTcgNi4wMTQxOCAtMC4xMTY2MTggNC44NDYzMSAwLjExNTY4NkMzLjY3ODQ0IDAuMzQ3OTkgMi42MDU2OCAwLjkyMTM5MyAxLjc2MzY5IDEuNzYzMzhDMC45MjE2OTggMi42MDUzNyAwLjM0ODI5NiAzLjY3ODEzIDAuMTE1OTkxIDQuODQ2MDFDLTAuMTE2MzEzIDYuMDEzODggMC4wMDI5MTM3NSA3LjIyNDQxIDAuNDU4NTk1IDguMzI0NTJDMC45MTQyNzcgOS40MjQ2NCAxLjY4NTk1IDEwLjM2NDkgMi42NzYwMiAxMS4wMjY1Wk0zLjM1NTY1IDIuMDE1OEM0LjE0NDU2IDEuNDg4NjcgNS4wNzIwNiAxLjIwNzMxIDYuMDIwODYgMS4yMDczMUM3LjI5MzE3IDEuMjA3MzEgOC41MTMzOCAxLjcxMjc0IDkuNDEzMDQgMi42MTI0QzEwLjMxMjcgMy41MTIwNiAxMC44MTgxIDQuNzMyMjYgMTAuODE4MSA2LjAwNDU3QzEwLjgxODEgNi45NTMzNyAxMC41MzY4IDcuODgwODggMTAuMDA5NiA4LjY2OTc4QzkuNDgyNTEgOS40NTg2OCA4LjczMzI4IDEwLjA3MzYgNy44NTY2OSAxMC40MzY3QzYuOTgwMTEgMTAuNzk5NyA2LjAxNTU0IDEwLjg5NDcgNS4wODQ5NiAxMC43MDk2QzQuMTU0MzkgMTAuNTI0NSAzLjI5OTYgMTAuMDY3NiAyLjYyODY5IDkuMzk2NzRDMS45NTc3OCA4LjcyNTgzIDEuNTAwODkgNy44NzEwNCAxLjMxNTc5IDYuOTQwNDZDMS4xMzA2OCA2LjAwOTg5IDEuMjI1NjggNS4wNDUzMiAxLjU4ODc4IDQuMTY4NzRDMS45NTE4NyAzLjI5MjE1IDIuNTY2NzUgMi41NDI5MiAzLjM1NTY1IDIuMDE1OFpcIlxuICAgICAgICAgICAgICAgICAgICBmaWxsPVwiY3VycmVudENvbG9yXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgPGRlZnM+XG4gICAgICAgICAgICAgICAgPGNsaXBQYXRoIFtpZF09XCJwYXRoSWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHJlY3Qgd2lkdGg9XCIxNFwiIGhlaWdodD1cIjE0XCIgZmlsbD1cIndoaXRlXCIgLz5cbiAgICAgICAgICAgICAgICA8L2NsaXBQYXRoPlxuICAgICAgICAgICAgPC9kZWZzPlxuICAgICAgICA8L3N2Zz5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaEljb24gZXh0ZW5kcyBCYXNlSWNvbiB7XG4gICAgcGF0aElkOiBzdHJpbmc7XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5wYXRoSWQgPSAndXJsKCMnICsgVW5pcXVlQ29tcG9uZW50SWQoKSArICcpJztcbiAgICB9XG59XG4iXX0=