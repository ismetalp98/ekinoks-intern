import { Response, Request, NextFunction } from 'express';
import { PaginationParams } from '../dto/paginatipn.dto';
import { VendorFilterInputs } from '../dto/vendor.dto';

export function paginationHandler(req: Request, res: Response, next: NextFunction) {

    const paginationRes = preparePagination(req);
    const filtersRes = prepareFilters(req);

    req.pagination = paginationRes;
    req.filters = filtersRes;
    
    next();
};

function preparePagination(req: Request) {
    const { page, limit, order, sort } = req.query;

    let pageRes: number = page ? parseInt('' + page, 10) : 1;
    let limitRes: number = limit ? parseInt('' + limit, 10) : 10;
    let orderByRes: string = order ? '' + order : 'id';
    let sortRes: string = sort ? '' + sort : 'asc';


    pageRes < 1 && (pageRes = 1);
    limitRes < 1 && (limitRes = 1);
    const offset = (pageRes - 1) * limitRes;

    const paginationRes: PaginationParams = {
        offset: offset,
        limit: limitRes,
        order: orderByRes,
        sort: sortRes,
    };
    return paginationRes
};

function prepareFilters(req: Request) {
    const { name, owner_name, pin_code, address, phone, email } = req.query;
    
    const nameRes: string | undefined = name ? '' + name : undefined;
    const ownerNameRes: string | undefined = owner_name ? '' + owner_name : undefined;
    const pinCodeRes: number | undefined = pin_code ? parseInt('' + pin_code, 10) : undefined;
    const addressRes: string | undefined = address ? '' + address : undefined;
    const phoneRes: string | undefined = phone ? '' + phone : undefined;
    const emailRes: string | undefined = email ? '' + email : undefined;

    const filtersRes: VendorFilterInputs = {
        name: nameRes,
        owner_name: ownerNameRes,
        pin_code: pinCodeRes,
        address: addressRes,
        phone: phoneRes,
        email: emailRes,
    };
    return filtersRes;
}