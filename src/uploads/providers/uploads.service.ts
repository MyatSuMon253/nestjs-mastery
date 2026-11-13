import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadsService {
  public async uploadFile(file: Express.Multer.File) {}
}
