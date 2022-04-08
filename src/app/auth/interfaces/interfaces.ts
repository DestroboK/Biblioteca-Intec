export interface AuthResponse{
    ok: boolean,
    uid?: string
    name?: string,
    token?: string,
    msg?: string,
    role?: string
}

export interface Usuario{
    uid: string,
    name?: string,
    role?: string,
    token?: string
}
export interface Libro{
    _id:string,
img_url?:string,
edition?: string,
description?: string,
categories?: string[],
publish_date?: string[],
title: string,
author?: string,
page_nums?:string,
book_quantity?: string
}